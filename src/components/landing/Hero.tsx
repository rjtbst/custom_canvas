import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-before-after.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import Image from "next/image";

const Hero = () => {
  const { displayedText: typedTitle, isComplete } = useTypingEffect({
    text: "Turn Your Memories into Stunning Art & Canvas Prints",
    speed: 80,
    delay: 500,
  });
  const scrollToWorkflow = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 parallax opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 fade-in-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-accent mb-4">
                <Sparkles className="w-5 h-5 animate-spin-slow " />
                <span className="text-sm font-medium tracking-wide uppercase">
                  Transform Your Memories
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-gradient-to-r from-accent to-gold bg-clip-text">
                  {typedTitle}
                </span>
                <span
                  className={`inline-block w-0.5 h-8 md:h-10 lg:h-12 bg-accent ml-1 ${
                    isComplete ? "animate-pulse" : "animate-pulse"
                  }`}
                />
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Upload a photo, edit it easily with AI-powered tools, and print
                it as premium canvas or framed art. Transform faded memories
                into timeless wall art.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-in-up">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToWorkflow}
                className="group"
              >
                Know more
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-accent text-accent hover:bg-accent hover:text-navy"
              >
                Get Started
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Photos Transformed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">98%</div>
                <div className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">24H</div>
                <div className="text-sm text-muted-foreground">
                  Average Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative fade-in-right">
            <div className="relative group hover-lift">
              <Image
                src={heroImage}
                alt="Before and after photo transformation showing old family photo restored as beautiful canvas art"
                className="w-full h-auto rounded-2xl shadow-2xl"
                // height={myImage.height}
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-gold text-navy px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                AI Enhanced
              </div>

              {/* Bottom Feature Highlight */}
              <div className="absolute bottom-4 left-4 bg-warm-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <div className="text-sm font-medium text-navy">
                  Premium Canvas Print
                </div>
                <div className="text-xs text-muted-foreground">
                  Ready to hang
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-xl animate-float delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-accent" />
      </div>
    </section>
  );
};

export default Hero;
