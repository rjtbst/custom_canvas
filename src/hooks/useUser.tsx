'use client';
import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';
import { UserDetails, Subscription } from '../../types';
import axios from 'axios';
import { Mixpanel, MixpanelEvents } from '@/lib/mixpanel';

declare global {
  interface Window {
    tolt_param?: any;
  }
}

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
  tokenBalance: number | null;
  setTokenBalance: (balance: number) => void;
  getTokenBalance: () => void;
  handlingNewUser: boolean;
  refetchUserDetails: () => void;
  getFeatureAccess: () => void;
  featureAccessData: {
    userTier: string;
    amount: number;
    featureAccess: string[];
  } | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [handlingNewUser, setHandlingNewUser] = useState(false);
  const [featureAccessData, setFeatureAccessData] = useState<{
    userTier: string;
    amount: number;
    featureAccess: string[];
  } | null>(null);

  const getTokenBalance = async () => {
    const {
      data: { tokenBalance }
    } = await axios.get('/api/a1_request/token_balance');
    setTokenBalance(tokenBalance);
  };

  const getFeatureAccess = async () => {
    try {
      const { data } = await axios.get('/api/users/feature_access');
      setFeatureAccessData(data);  // Set the fetched featureAccess in state
    } catch (error) {
      console.error('Error fetching feature access:', error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getTokenBalance();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      getFeatureAccess(); 
    }
  }, [user?.id]);

  const loadUser = async () => {
    const { data: userDetailData } = await supabase
      .from('users')
      .select('*')
      .single();
    setUserDetails(userDetailData);
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active']);
    if (subData && Array.isArray(subData) && subData.length > 0) {
      setSubscription(subData[0]);
    }
    const {
      new_user_email_sent_at,
      new_user_offer_checked_at,
      email_confirmed_at
    } = userDetailData || {};
    if (
      email_confirmed_at &&
      (!new_user_email_sent_at || !new_user_offer_checked_at)
    ) {
      try {
        setHandlingNewUser(true);
        const { status } = await axios.post('/api/users/handle_new_user', {
          // ip_address,
          tolt_param: window?.tolt_param
        });
        await getTokenBalance();
        setHandlingNewUser(false);
      } catch (error) {
        setHandlingNewUser(false);
        console.log(error);
      }
    }
  };

  const refetchUserDetails = async () => {
    setIsloadingData(true);
    await getFeatureAccess();
    await loadUser();
    await getTokenBalance();
    setIsloadingData(false);
  };

  useEffect(() => {
    if (user?.id) {
      Mixpanel.identify(user.id);
      Mixpanel.track(MixpanelEvents['API Response'], {
        action: 'user_logged_in'
      });

      loadUser();
    }
  }, [user?.id]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    tokenBalance,
    setTokenBalance,
    getTokenBalance,
    getFeatureAccess,
    handlingNewUser,
    refetchUserDetails,
    featureAccessData
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
