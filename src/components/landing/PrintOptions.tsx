import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Frame, Image } from "lucide-react";
import galleryWall from "@/assets/gallery-wall.jpg";

const PrintOptions = () => {
  const [selectedCategory, setSelectedCategory] = useState("canvas");
  const [selectedSize, setSelectedSize] = useState("medium");

  const categories = [
    {
      id: "Acrylic",
      name: "Acrylic frames",
      icon: Image,
      description: "High-quality photo prints on premium acrylic glass"
    },
    {
      id: "canvas", 
      name: "Canvas Prints",
      icon: Frame,
      description: "Museum-quality canvas with various mounting options"
    }
  ];

  const photoOptions = {
    sizes: [
      { id: "small", name: "Small", dimensions: "8x10", price: 15 },
      { id: "medium", name: "Medium", dimensions: "11x14", price: 25 },
      { id: "large", name: "Large", dimensions: "16x20", price: 45 }
    ],
    formats: [
      // { id: "print-only", name: "Print Only", price: 0 },
      { id: "framed", name: "With Acrylic Frame", price: 20, badge: "Hanging Ready" }
    ]
  };

  const canvasOptions = {
    sizes: [
      { id: "small", name: "Small", dimensions: "12x16", price: 45 },
      { id: "medium", name: "Medium", dimensions: "16x20", price: 65 },
      { id: "large", name: "Large", dimensions: "20x24", price: 95 }
    ],
    orientations: [
      { id: "portrait", name: "Portrait" },
      { id: "landscape", name: "Landscape" },
      { id: "square", name: "Square" }
    ],
    mountings: [
      { id: "rolled", name: "Rolled Canvas", price: 0 },
      { id: "single", name: "Single Panel", price: 25 },
      { id: "split", name: "Split Canvas", price: 45, badge: "Multi-panel" }
    ]
  };

  const getPrice = () => {
    const basePrice = selectedCategory === "canvas" 
      ? canvasOptions.sizes.find(s => s.id === selectedSize)?.price || 0
      : photoOptions.sizes.find(s => s.id === selectedSize)?.price || 0;
    
    return basePrice;
  };

  return (
    <section className=" bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <Frame className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide uppercase">Premium Printing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Explore Print Options
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our premium print options. Each piece is carefully crafted using the highest quality materials and professional printing techniques.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery Preview */}
          <div className="fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img 
                src={galleryWall} 
                alt="Beautiful gallery wall showing various canvas prints and framed photos in a modern living room"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent">
                <div className="absolute bottom-6 left-6 text-warm-white">
                  <h3 className="text-xl font-semibold mb-2">Gallery Wall Collection</h3>
                  <p className="text-sm opacity-90">Mix and match different sizes for the perfect display</p>
                </div>
              </div>
            </div>

            {/* Quality Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-accent font-semibold mb-1">Premium Materials</div>
                <div className="text-sm text-muted-foreground">Archival quality papers and canvas</div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-accent font-semibold mb-1">Global Delivery</div>
                <div className="text-sm text-muted-foreground">Worldwide shipping available</div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-accent font-semibold mb-1">100 Year Guarantee</div>
                <div className="text-sm text-muted-foreground">Fade-resistant inks and materials</div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-accent font-semibold mb-1">Expert Craftsmanship</div>
                <div className="text-sm text-muted-foreground">Hand-finished by professionals</div>
              </div>
            </div>
          </div>

          {/* Print Configuration */}
          <div className="space-y-8 fade-in-right">
            {/* Category Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-navy">Choose Print Type</h3>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedCategory === category.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className={`w-5 h-5 ${
                        selectedCategory === category.id ? 'text-accent' : 'text-muted-foreground'
                      }`} />
                      <div>
                        <div className="font-medium text-navy">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.description}</div>
                      </div>
                      {selectedCategory === category.id && (
                        <Check className="w-5 h-5 text-accent ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-navy">Select Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {(selectedCategory === "canvas" ? canvasOptions.sizes : photoOptions.sizes).map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedSize === size.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="font-medium text-navy text-sm">{size.name}</div>
                    <div className="text-xs text-muted-foreground">{size.dimensions}"</div>
                    <div className="text-sm font-semibold text-accent mt-2">₹{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            {selectedCategory === "canvas" ? (
              <div className="space-y-6">
                {/* Orientation */}
                <div className="space-y-3">
                  <h4 className="font-medium text-navy">Orientation</h4>
                  <div className="flex gap-2">
                    {canvasOptions.orientations.map((orientation) => (
                      <Badge key={orientation.id} variant="outline" className="cursor-pointer hover:bg-accent hover:text-navy">
                        {orientation.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mounting Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-navy">Mounting Option</h4>
                  <div className="space-y-2">
                    {canvasOptions.mountings.map((mounting) => (
                      <div key={mounting.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{mounting.name}</span>
                          {mounting.badge && (
                            <Badge variant="secondary" className="text-xs">{mounting.badge}</Badge>
                          )}
                        </div>
                        <span className="text-sm text-accent font-medium">
                          {mounting.price === 0 ? "Included" : `+₹${mounting.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h4 className="font-medium text-navy">Format Options</h4>
                <div className="space-y-2">
                  {photoOptions.formats.map((format) => (
                    <div key={format.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{format.name}</span>
                        {format.badge && (
                          <Badge variant="secondary" className="text-xs">{format.badge}</Badge>
                        )}
                      </div>
                      <span className="text-sm text-accent font-medium">
                        {format.price === 0 ? "Included" : `+₹${format.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Summary & CTA */}
            <div className="bg-card p-6 rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-navy">Total Price</span>
                <span className="text-2xl font-bold text-accent">₹{getPrice()}</span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex justify-between">
                  <span>Base Price ({selectedSize})</span>
                  <span>₹{getPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <Button variant="premium" size="lg" className="w-full">
                Customize & Order Now
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-3">
                Free shipping on orders over ₹999 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintOptions;