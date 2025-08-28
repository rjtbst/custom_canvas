import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/landing/Footer";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Custom Canvas",
  description: "Create your own custom canvas with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="bg-background">
          <UserProvider>
            <Navbar />
            {children}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                className: "bg-gray-800 text-white",
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
