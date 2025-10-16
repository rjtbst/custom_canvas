import "./globals.css";
import Navbar from "../components/Navbar";

import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { PrintProvider } from "@/context/PrintProvider";

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
    <html className="h-full">
  <body className="min-h-screen flex flex-col bg-background">
    <UserProvider>
      <PrintProvider>
        <Navbar />
        <main className="flex-1 pt-16 overflow-hidden">{children}</main>
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
      </PrintProvider>
    </UserProvider>
  </body>
</html>
  );
}
