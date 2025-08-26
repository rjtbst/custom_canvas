'use client'
import { useEffect, useState } from "react";
import { MailIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { supabase } from '@/lib/supabaseClient'
import { Mixpanel, MixpanelEvents } from "@/lib/mixpanel";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import type { Provider } from "@supabase/supabase-js";
import { MotionConfig } from "framer-motion";

interface EmailInputProps {
setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface EmailOptionsProps {
  continueWithEmail: () => void;
  getMagicLink: () => void;
}

interface LoginFormProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  signInBtnText: string;
  emailLogin: () => void;
  setForgotPasswordState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpFormProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  signUpBtnText: string;
  signUp: () => void;
}

interface ForgotPasswordFormProps {
  forgotPasswordCallback: () => Promise<void>;
  setForgotPasswordState :React.Dispatch<React.SetStateAction<boolean>>
  setShowDiscordMessage?: () => void | null
}

interface PasswordLoginFormProps {
 emailExists : boolean | null;
 password : string;
 setPassword :React.Dispatch<React.SetStateAction<string>>;
  emailLogin : () => void;
  signUp : () => void;
  signUpBtnText : string;
  signInBtnText : string;
  setForgotPasswordState : React.Dispatch<React.SetStateAction<boolean>>;

}

// Email regex
const emailRegex =
  /^(?!.*(?:mailinator\.com|trbvm\.com|guerrillamail\.com|guerrillamailblock\.com|sharklasers\.com|guerrillamail\.net|guerrillamail\.org|guerrillamail\.biz|spam4\.me|grr\.la|guerrillamail\.de|grandmasmail\.com|zetmail\.com|vomoto\.com|abyssmail\.com|anappthat\.com|eelmail\.com|fakeinbox\.com))[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@((?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w]))$/;

const ActionButtonText = {
  sign_in: "Sign in with Email",
  sign_up: "Sign in with Email",
  resend: "Resend confirmation email",
};

const ActionErrorMessages = {
  not_confirmed: "Email not confirmed",
  throttling: "For security purposes",
};

export default function LoginDrawer({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [signUpBtnText, setSignUpBtnText] = useState(ActionButtonText.sign_up);
  const [signInBtnText, setSignInBtnText] = useState(ActionButtonText.sign_in);

  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    Mixpanel.track(MixpanelEvents["Page View"], { path: "/signin" });
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    const checkSessionAndUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { user } = session;
        if (user.user_metadata?.is_disabled) {
          await supabase.auth.signOut();
          router.push("/signin");
        } else {
          const redirectTo = searchParams.get("redirect") || '/create';
          Mixpanel.track(MixpanelEvents['API Response'], {
            action: 'sign_in_success',
            path: '/signin'
          });
          router.replace(redirectTo.toString());
        }
      }
    };

    checkSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { user } = session;
          if (user.user_metadata?.is_disabled) {
            await supabase.auth.signOut();
            router.push("/signin");
          } else {
            const redirectTo = searchParams.get("redirect") || "/edit";
            Mixpanel.track(MixpanelEvents["API Response"], {
              action: "sign_in_success",
              path: "/signin",
            });
            router.replace(redirectTo.toString());
          }
        } else if (event === "PASSWORD_RECOVERY") {
          router.push("/reset-password");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  const checkIfLoggedIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const redirectTo = searchParams.get("redirect") || "/edit";
      router.replace(redirectTo.toString());
    }
  };

  const continueWithSocial = async (provider:Provider) => {
    const redirectToURL = searchParams.get('redirect')
      ? `${window.location.origin}${searchParams.get('redirect')}`
      : `${window.location.origin}/create`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectToURL }
    });

    if (error) {
     toast.error(error.message);
    }
  };

  const emailLogin = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      if (error.message.includes(ActionErrorMessages.not_confirmed))
        setSignInBtnText(ActionButtonText.resend);
      return;
    }

    if (user?.user_metadata?.is_disabled) {
      toast.error("Your account has been deleted.");
      await supabase.auth.signOut();
      return;
    }
  if(user){
    toast.success("Login Successful");
  }
    const redirectTo = searchParams.get("redirect") || "/create";
    router.replace(redirectTo);
  };

  const signUp = async () => {
    const redirectToURL = searchParams.get("redirect")
      ? `${window.location.origin}${searchParams.get("redirect")}`
      : `${window.location.origin}/create`;

    const ipAddress = await fetchIPAddress();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { ip_address: ipAddress, tolt_param: window?.tolt_param },
        emailRedirectTo: redirectToURL,
      },
    });

    if (!error) {
      toast.success("Signup Successful, Please Confirm it in your Email");
      setSignUpBtnText(ActionButtonText.resend);
    } else handleAuthError(error, "signup");
  };

  const forgotPasswordCallback = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (!error) toast.success("Password Reset Email Sent");
    else toast.error(error.message);
  };

  const fetchIPAddress = async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org?format=json");
      return data.ip;
    } catch {
      return "non_traceable";
    }
  };

  const handleAuthError = (error: any, action: string) => {
    toast.error(error.message);
    setSignUpBtnText(
      error.message.includes(ActionErrorMessages.throttling)
        ? ActionButtonText.resend
        : ActionButtonText.sign_up
    );
  };

  const continueWithEmail = async () => {
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email);

    if (error) {
      return toast.error("Error checking email existence");
    }

    // Show password input
    setShowPasswordInput(true);

    // If user exists → login, else → signup
    setEmailExists(data.length > 0);
  };

  const getMagicLink = async () => {
    if (!emailRegex.test(email))
      return toast.error("Please enter a valid email address");
    const redirectTo = searchParams.get("redirect");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo
          ? `${window.location.origin}${redirectTo}`
          : `${window.location.origin}/create`,
      },
    });

    if (!error) toast.success("Magic Link Sent");
    else
      toast.error(
        "For security purposes, you can only request this once every 30 seconds"
      );
  };

  return (
    
     <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button onClick={() => setOpen(true)}>Log in</Button>
      )}

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[90vh] flex flex-col">
          <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-3 text-center">
            <DrawerHeader>
              <DrawerTitle>Sign in to continue</DrawerTitle>
            </DrawerHeader>

            <Button
              variant="hero"
              size="lg"
              className="btn-outline  ring-1 rounded-3xl"
              onClick={() => continueWithSocial("google")}
            >
              <FcGoogle className="inline mr-2" />
              Continue with Google
            </Button>

            <div className="divider text-sm text-black before:bg-black after:bg-black">
              Or
            </div>

            {!forgotPasswordState ? (
              <>
                <EmailInput setEmail={setEmail} />
                {!showPasswordInput ? (
                  <EmailOptions
                    continueWithEmail={continueWithEmail}
                    getMagicLink={getMagicLink}
                  />
                ) : (
                  <PasswordLoginForm
                    emailExists={emailExists}
                    password={password}
                    setPassword={setPassword}
                    emailLogin={emailLogin}
                    signUp={signUp}
                    signUpBtnText={signUpBtnText}
                    signInBtnText={signInBtnText}
                    setForgotPasswordState={setForgotPasswordState}
                  />
                )}
              </>
            ) : (
              <ForgotPasswordForm
                forgotPasswordCallback={forgotPasswordCallback}
                setForgotPasswordState={setForgotPasswordState}
                setShowDiscordMessage={() => {}}
              />
            )}
          </div>
          </motion.div>
          <DrawerFooter>
            <p className="text-sm text-muted-foreground text-center">
              By signing in, you agree to our{" "}
              <a href="/about/terms" target="_blank" className="underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/about/privacy" target="_blank" className="underline">
                Privacy Policy
              </a>
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}

// Reuse your subcomponents here like EmailInput, EmailOptions, PasswordLoginForm, LoginForm, SignUpForm, ForgotPasswordForm (exact same as your current code)

const EmailInput: React.FC<EmailInputProps> = ({ setEmail }) => (
  <>
    {/* <label className=" label text-sm font-['inter']">
      <span className="label-text mt-2">Email</span>
    </label> */}
    <Input
      type="text"
      placeholder="Enter your email"
      className=" ring-1 w-fit rounded-3xl"
      onChange={(e) => setEmail(e.target.value)}
    />
  </>
);

const EmailOptions: React.FC<EmailOptionsProps> = ({ continueWithEmail, getMagicLink }) => (
  <div className="flex flex-col ">
    <div className="form-control mt-5">
      <Button variant="premium" size="lg" onClick={continueWithEmail}>
        <MailIcon className="inline mr-2" />
        Continue with Email
      </Button>
    </div>
    <div className="form-control mt-8">
      <Button variant="gold" size="lg" onClick={getMagicLink}>
        <MailIcon className="inline mr-2" />
        Get a Magic Link
      </Button>
    </div>
  </div>
);

const PasswordLoginForm:React.FC<PasswordLoginFormProps> = ({
  emailExists,
  password,
  setPassword,
  emailLogin,
  signUp,
  signUpBtnText,
  signInBtnText,
  setForgotPasswordState,
}) => (
  <>
    {emailExists ? (
      <LoginForm
        password={password}
        setPassword={setPassword}
        signInBtnText={signInBtnText}
        emailLogin={emailLogin}
        setForgotPasswordState={setForgotPasswordState}
      />
    ) : (
      <SignUpForm
        password={password}
        setPassword={setPassword}
        signUpBtnText={signUpBtnText}
        signUp={signUp}
      />
    )}
  </>
);

const LoginForm: React.FC<LoginFormProps> = ({
  password,
  setPassword,
  signInBtnText,
  emailLogin,
  setForgotPasswordState,
}) => (
  <>
    <label className="label text-sm font-['inter']">
      <span className="label-text">Password</span>
    </label>
    <Input
      type="password"
      placeholder="password"
      className="input  input-bordered rounded-3xl"
      onChange={(e) => setPassword(e.target.value)}
    />
    <label className="label text-sm font-['inter']">
      <a
        href="#"
        onClick={() => {
          setForgotPasswordState(true);
        }}
        className="label-text-alt link text-lg"
      >
        Reset password
      </a>
    </label>
    <div className="form-control mt-6">
      <Button
        variant="premium"
        size="lg"
        className=" font-['inter'] font-semibold normal-case text-base  rounded-3xl"
        onClick={emailLogin}
      >
        <MailIcon className="text-2xl" /> {signInBtnText}
      </Button>
    </div>
  </>
);

const SignUpForm:React.FC<SignUpFormProps> = ({ password, setPassword, signUpBtnText, signUp }) => (
  <>
      {/* <label className="label text-sm font-['inter']">
        <span className="">Password</span>
      </label> */}
      <Input
        type="password"
        placeholder="Enter your Password"
        className="input w-fit ring-1 input-bordered rounded-3xl"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="form-control my-4">
        <Button
          variant="premium"
          size="lg"
          className=" leading-3 font-['inter'] font-semibold normal-case text-base  rounded-3xl"
          onClick={signUp}
        >
          {signUpBtnText}
        </Button>
      </div>
  </> 
);

const ForgotPasswordForm :React.FC<ForgotPasswordFormProps> = ({
  forgotPasswordCallback,
  setForgotPasswordState,
  setShowDiscordMessage,
}) => (
  <div className="card  w-full max-w-[32.438rem] shadow-2xl bg-base-100">
    <label className="label text-sm font-['inter']">
      <span className="label-text">Email</span>
    </label>
    <Input
      type="text" 
      placeholder="Enter your email"
      className="input  input-bordered rounded-3xl"
    />
    <div className="form-control mt-8">
      <Button
        size="lg"
        variant="premium"
        className="  font-['outfit'] font-semibold normal-case text-base  rounded-3xl"
        onClick={forgotPasswordCallback}
      >
        Reset Via Email
      </Button>
    </div>
    <div className="form-control mb-2 mt-8">
      <Button
        size="lg"
        variant="gold"
        className=" bg-white font-['outfit'] font-semibold normal-case text-base  hover:text-white  rounded-3xl"
        onClick={() => setForgotPasswordState(false)}
      >
        Back
      </Button>
    </div>
  </div>
);
