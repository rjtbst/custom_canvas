import { Upload, Palette, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload or Generate Your Photo",
      description: "Drag and drop your photo or use our AI generator to create the perfect starting point for your artwork.",
      features: ["Support for all photo formats", "AI photo generation", "Cloud storage included"]
    },
    {
      number: "02", 
      icon: Palette,
      title: "Edit & Choose Print Style",
      description: "Transform your photo with professional editing tools. Choose from artistic styles like watercolor, abstract, or classic photo prints.",
      features: ["AI-powered restoration", "Artistic filters", "Real-time preview"]
    },
    {
      number: "03",
      icon: Truck,
      title: "Checkout & Get It Delivered",
      description: "Select your preferred size and framing option. We'll print your masterpiece on premium materials and deliver it worldwide.",
      features: ["Premium materials", "Global delivery", "Order tracking"]
    }
  ];

  return (
    <section id="how-it-works" className="bg-warm-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <span className="text-sm font-medium tracking-wide uppercase">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your memories into stunning art in just three simple steps. Our AI-powered platform makes it easy for anyone to create professional-quality prints.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-accent to-transparent transform translate-x-4 z-0"></div>
              )}
              
              <div className="bg-card p-8 rounded-2xl card-3d relative z-10 fade-in-up">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-navy rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                <div className="card-content">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Token System Highlight */}
        <div className="bg-gradient-to-r from-gold/10 to-accent/10 p-8 rounded-2xl border border-gold/20 fade-in-up">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="text-xl font-semibold text-navy">20 Free Tokens on Signup</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start transforming your photos immediately with 20 free editing tokens. Earn 10 additional tokens with each purchase to keep creating beautiful art.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <span className="text-gold">✨</span>
                <span>20 tokens = 20 edits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold">🛒</span>
                <span>+10 tokens per purchase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;