import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-red-600'>Navbar no use</div>
  )
}

export default Navbar

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { UserCircle, Menu, X } from "lucide-react";
// import { useUser } from "@/hooks/UseUser";
// import { admins } from "@/lib/constant";
// import { Mixpanel, MixpanelEvents } from "@/lib/mixpanel";
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuLink,
// } from "@/components/ui/navigation-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import classNames from "classnames";
// import { toast } from "react-hot-toast";
// import LoginDrawer from "@/components/LoginDrawer";


// const Navbar = () => {
//   const { user, tokenBalance } = useUser();

//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [open, setOpen] = useState(false);

//   const navigation = user?.id
//     ? [
//         { name: "Editor", href: "/editor" },
//         { name: "Checkout", href: "/checkout" },
//         { name: "Orders", href: "/orders" },
//         { name: "Profile", href: "/profile" },
//         { name: "About", href: "/about" },
//         { name: "Contact", href: "/contact" },
//         ...(admins.includes(user.id)
//           ? [{ name: "Admin", href: "/admin" }]
//           : []),
//       ]
//     : [
//         { name: "About", href: "/about" },
//         { name: "Contact", href: "/contact" },
//         { name: "Pricing", href: "/pricing" },
//       ];

//   return (
//     <nav className="w-full border-b bg-transparent backdrop-blur-sm fixed top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
//         {/* Logo */}
//         <Link to="/" className="font-bold text-xl text-primary">
//           CustomCanvas
//         </Link>
        
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex  items-center gap-6">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {navigation.map((item) => (
//                 <NavigationMenuItem key={item.name}>
//                   <NavigationMenuLink asChild>
//                     <Link
//                       to={item.href}
//                       className={classNames(
//                         "px-3 py-2 text-sm font-medium rounded-md transition",
//                         pathname === item.href
//                           ? "bg-primary text-white"
//                           : "hover:bg-muted"
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           {/* Token Balance */}
//           {user && (
//             <motion.div
//               initial={{ opacity: 0, y: -5 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="cursor-pointer flex items-center"
//               onClick={() => {
//                 Mixpanel.track(MixpanelEvents["Interact"], {
//                   action: "redirect_to_pricing",
//                   entryPoint: "nav_wallet",
//                 });
//                 navigate("/pricing");
//               }}
//             >
//               <span
//                 className={classNames(
//                   "text-lg font-semibold ml-2",
//                   tokenBalance && tokenBalance > 10
//                     ? "text-primary"
//                     : "text-destructive"
//                 )}
//               >
//                 {tokenBalance ?? 0}
//               </span>
//             </motion.div>
//           )}

//           {/* User / Login */}
//           {user ? (
//             <Link to="/account">
//               <UserCircle className="w-7 h-7 text-muted-foreground hover:text-primary transition" />
//             </Link>
//           ) : (
//             <LoginDrawer
//               trigger={
//                 <Button
//                   variant="hero"
//                   size="lg"
//                 >
//                   Log in
//                 </Button>
//               }
//             />
          
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden ">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 {open ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="p-6">
//               <motion.div
//                 initial={{ x: 50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex flex-col gap-4"
//               >
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setOpen(false)}
//                     className={classNames(
//                       "text-lg font-medium transition",
//                       pathname === item.href
//                         ? "text-primary"
//                         : "hover:text-muted-foreground"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 {user && (
//                   <span
//                     className="mt-4 font-semibold cursor-pointer"
//                     onClick={() => {
//                       setOpen(false);
//                       navigate("/pricing");
//                     }}
//                   >
//                     Tokens: {tokenBalance ?? 0}
//                   </span>
//                 )}

//                 {!user && (
//                     <LoginDrawer
//                     trigger={
//                     <Button
//                     variant="default"
//                     size="lg"
//                     className="w-full"
//                   >
//                     Log in
//                   </Button>
//                     }
//                     />
                
//                 )}
//               </motion.div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
