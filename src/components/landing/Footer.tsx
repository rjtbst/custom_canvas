import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "../ui/input";

const Footer = () => {
  const footerLinks = {
    "Product": [
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Print Quality", href: "#quality" },
      { name: "Shipping Info", href: "#shipping" }
    ],
    "Support": [
      { name: "FAQ", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
      { name: "Order Status", href: "#track" },
      { name: "Returns", href: "#returns" }
    ],
    "Company": [
      { name: "About Us", href: "#about" },
      { name: "Reviews", href: "#reviews" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">CustomCanvas</h3>
                <p className="text-muted-foreground text-sm">
                  Transform your precious memories into stunning wall art with our AI-powered photo enhancement and premium printing services.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>support@customcanvas.com</span>
                </div>
                {/* <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>1-800-MEMORY</span>
                </div> */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Delhi, IN</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-accent/10 hover:bg-accent hover:text-navy rounded-full flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-semibold text-navy">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-semibold text-navy mb-2">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest tips on photo restoration and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button variant="premium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              © 2025 Customcanvas. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-accent transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;