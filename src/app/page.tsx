"use client";
import React, { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import BeforeAfter from "@/components/landing/BeforeAfter";
import EditingFeatures from "@/components/landing/EditingFeatures";
import PrintOptions from "@/components/landing/PrintOptions";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  useScrollAnimation();
  useEffect(() => {
    // Smooth scroll for the entire page
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  return (
    <main className="min-h-screen -mt-16 flex flex-col gap-20">
      <Hero />
      <HowItWorks />
      <BeforeAfter />
      {/* <EditingFeatures /> */}
      <PrintOptions />
      <FinalCTA />
        <Footer />
    </main>
  );
};

export default LandingPage;
