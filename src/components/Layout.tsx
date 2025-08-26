import NavbarMenu from "@/components/Navbar";
import Footer from "@/components/landing/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarMenu />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;