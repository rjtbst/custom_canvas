"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { edit_templates, TypeEditTemplate } from "../../lib/constants";
import ImageRevealSlider from "../ui/ImageRevealSlider";

export const TemplateGrid = () => {
  const router = useRouter();
  const handleTemplateClick = (template: TypeEditTemplate) => {
    const requestParams = {
      imageId: template.id,
      name: template.name,
    };
    localStorage.setItem("selectedTemplateId", template.id.toString());
    const params = new URLSearchParams({
      requestParams: JSON.stringify(requestParams),
    });
    router.push(`/create?${params.toString()}`);
  };

  return (
    <div className="mt-14  flex flex-col justify-center items-center">
      <div className="grid w-full  grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-x-8 gap-y-8 p-6">
        {edit_templates.slice(0, 8).map((template) => (
          <div
            key={template.id}
            className="flex flex-col  overflow-hidden justify-center cursor-pointer  transition-shadow"
            // onClick={() => handleTemplateClick(template)}
          >
            <ImageRevealSlider
            showSliderButton={true}
              beforeSrc={template.image[0]}
              afterSrc={template.image[1]}
              className=" rounded-3xl "
            />
            <div className="px-3">
              <Button
                variant="premium"
                className="w-full mt-4"
                onClick={() => handleTemplateClick(template)}
              >
                <a className="flex items-center gap-2 !ring-0 text-brand-color-light text-md font-['inter'] leading-[21px] font-semi-bold transition ease-in-out duration-150">
                  <span>{template.name}</span>
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  const [sliderValue, setSliderValue] = useState([50]);

  // Mock before/after images - in real app these would be actual images
  const beforeImage = "/images/repair_before.jpeg";
  const afterImage = "/images/repair_after.png";

  return (
    <section className=" bg-warm-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <span className="text-sm font-medium tracking-wide uppercase">
              See the Magic
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Before & After Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the incredible transformation of old, faded photos into
            vibrant, professional artwork ready for your walls.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Before/After Slider */}
          <div className="relative fade-in-left">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-muted">
              {/* Before Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${beforeImage})`,
                  filter: "sepia(100%) contrast(80%) brightness(90%)",
                }}
              />

              {/* After Image with mask */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url(${afterImage})`,
                  clipPath: `polygon(${sliderValue[0]}% 0%, 100% 0%, 100% 100%, ${sliderValue[0]}% 100%)`,
                }}
              />

             

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-navy/80 text-warm-white px-3 py-1 rounded-full text-sm font-medium">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-accent/90 text-navy px-3 py-1 rounded-full text-sm font-medium">
                After
              </div>
            </div>

            {/* Slider Control */}
            <div className="mt-6 px-4">
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Drag to compare</span>
                <span>{sliderValue[0]}%</span>
              </div>
            </div>
          </div>

          {/* Transformation Details */}
          <div className="space-y-8 fade-in-right">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy">
                AI-Powered Photo Restoration
              </h3>
              <p className="text-muted-foreground">
                Watch as our advanced AI technology breathes new life into old,
                damaged, or faded photographs. Every detail is carefully
                restored while maintaining the authentic character of your
                memories.
              </p>
            </div>

            {/* Transformation Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">
                  Color Accuracy
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-2xl font-bold text-accent">4K+</div>
                <div className="text-sm text-muted-foreground">Resolution</div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-2xl font-bold text-accent">60s</div>
                <div className="text-sm text-muted-foreground">
                  Processing Time
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft">
                <div className="text-2xl font-bold text-accent">∞</div>
                <div className="text-sm text-muted-foreground">Revisions</div>
              </div>
            </div>

            {/* Process Highlights */}
            <div className="space-y-4">
              <h4 className="font-semibold text-navy">What We Enhanced:</h4>
              <div className="space-y-3">
                {[
                  "Restored original colors and vibrancy",
                  "Removed scratches and damage",
                  "Enhanced facial details and clarity",
                  "Improved overall image quality",
                  "Optimized for print reproduction",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Examples Grid */}
        <div className="mt-20 fade-in-up">
          <h1 className="text-4xl text-neutral font-bold text-center text-navy mb-8">
            More Transformations
          </h1>
          
            <TemplateGrid />
          
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
