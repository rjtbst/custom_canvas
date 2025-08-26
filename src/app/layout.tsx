import Navbar from "./Navbar";
import "./globals.css";
import { Providers } from "./Providers";
import Footer from "@/components/landing/Footer";


export const metadata = {
  title: "Custom Canvas",
  description: "Create your own custom canvas with ease",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme='mytheme'>
      <body>
        <div className="bg-base-100 min-h-screen">
        <Providers>
          <Navbar/>
          {children}
          <Footer/>
        </Providers>
        </div>
      </body>
    </html>
  );
}
