import Navbar from "./Navbar";
import "./globals.css";
import { Providers } from "./Providers";
import Footer from "@/components/landing/Footer";


export const metadata = {
  title: "Custom Canvas",
  description: "Create your own custom canvas with ease",
};


export default function RootLayout({ children }:{children: React.ReactNode}) {
  return (
    <html>
      <body>
        <Providers>
          {children}
          <Footer/>
        </Providers>
        
      </body>
    </html>
  );
}

