import { Button } from "@/components/ui/button";
import { Wand2, Palette, Camera, Sparkles } from "lucide-react";

const EditingFeatures = () => {
  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Restoration",
      description: "Automatically repair damage, remove scratches, and enhance old photos",
      color: "text-blue-500"
    },
    {
      icon: Palette,
      title: "Colorization",
      description: "Bring black and white photos to life with realistic color enhancement",
      color: "text-purple-500"
    },
    {
      icon: Camera,
      title: "Photo Enhancement",
      description: "Improve clarity, adjust lighting, and optimize image quality",
      color: "text-green-500"
    },
    {
      icon: Sparkles,
      title: "Artistic Filters",
      description: "Transform photos into paintings, sketches, and abstract art",
      color: "text-amber-500"
    }
  ];

  const styles = [
    "Water Painting",
    "Abstract Art", 
    "Photo Print",
    "Canvas Painting",
    "Black & White",
    "Vintage Sepia",
    "Oil Painting",
    "Sketch Style"
  ];

  return (
    <section className=" bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide uppercase">Powerful Editor</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Editing Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our beginner-friendly editor is powered by advanced AI to help you create stunning results without any design experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-8 fade-in-left">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 group hover-lift p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-accent/20 to-gold/20 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Style Options */}
          <div className="space-y-8 fade-in-right">
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h3 className="text-xl font-semibold text-navy mb-6">Choose Your Print Style</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {styles.map((style, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group"
                  >
                    <div className="text-sm font-medium text-navy group-hover:text-accent transition-colors">
                      {style}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Quality:</span>
                  <span className="text-accent font-medium">Ultra High</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">AI Enhancement:</span>
                  <span className="text-accent font-medium">Professional</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preview Time:</span>
                  <span className="text-accent font-medium">Real-time</span>
                </div>
              </div>

              <Button variant="premium" className="w-full mt-6">
                Try Editor Now
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-in-up">
          <div className="bg-gradient-to-r from-navy to-navy-light p-8 rounded-2xl text-warm-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Photos?</h3>
            <p className="text-warm-white/80 mb-6 max-w-md mx-auto">
              Join thousands of satisfied customers who have turned their memories into beautiful art.
            </p>
            <Button variant="gold" size="lg">
              Start Creating Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditingFeatures;