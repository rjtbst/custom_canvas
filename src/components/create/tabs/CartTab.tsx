"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import { usePrint } from "@/context/PrintProvider";
import { pricingConfig } from "../../../lib/constants";

export default function CartTab() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = usePrint();
 console.log("Render CartTab with cart items:", cart);
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const price =
        pricingConfig[item.category].sizes[item.orientation].find(
          (s) => s.id === item.size
        )?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className="p-2">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-xl font-semibold mb-2">Your cart is empty</p>
          <p>Add some photos or templates to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden border">
                      {item.url ? (
                        <Image
                          src={item.url}
                          alt="Your Photo"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          Loading...
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Your Photo</h4>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.category} - {item.size} ({item.orientation})
                      </p>
                      <p className="text-sm text-accent font-semibold">
                        ₹
                        {
                          pricingConfig[item.category].sizes[item.orientation].find(
                            (s) => s.id === item.size
                          )?.price
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}
