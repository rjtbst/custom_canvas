import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-16 navy-gradient text-warm-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8 fade-in-up">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-gold" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
              Don't let your memories fade.
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gold">
              Transform them into timeless art today.
            </h3>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-warm-white/80 max-w-3xl mx-auto">
            Join over 50,000 happy customers who have preserved their precious memories as beautiful wall art. 
            Start your transformation journey today with 20 free editing tokens.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="gold" 
              size="xl" 
              className="group min-w-[200px]"
            >
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Upload Your Photo
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
           
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-warm-white/20">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gold">50K+</div>
                <div className="text-sm text-warm-white/70">Photos Transformed</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gold">98%</div>
                <div className="text-sm text-warm-white/70">Satisfaction Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gold">4.9★</div>
                <div className="text-sm text-warm-white/70">Customer Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gold">24H</div>
                <div className="text-sm text-warm-white/70">Fast Delivery</div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 mt-12">
            <h4 className="text-xl font-semibold mb-6">What You Get Today:</h4>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-navy text-sm font-bold">✓</span>
                </div>
                <div>
                  <div className="font-medium">20 Free Tokens</div>
                  <div className="text-sm text-warm-white/70">Start editing immediately</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-navy text-sm font-bold">✓</span>
                </div>
                <div>
                  <div className="font-medium">AI Enhancement</div>
                  <div className="text-sm text-warm-white/70">Professional-quality results</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-navy text-sm font-bold">✓</span>
                </div>
                <div>
                  <div className="font-medium">Premium Printing</div>
                  <div className="text-sm text-warm-white/70">Museum-quality materials</div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="text-center pt-6">
            <p className="text-sm text-gold animate-pulse">
              ⚡ Limited time: Free shipping on orders over Rs999
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;