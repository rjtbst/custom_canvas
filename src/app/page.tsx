"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { edit_templates, TypeEditTemplate } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import BeforeAfter from "@/components/landing/BeforeAfter";
import EditingFeatures from "@/components/landing/EditingFeatures";
import PrintOptions from "@/components/landing/PrintOptions";
import FinalCTA from "@/components/landing/FinalCTA";



const page = () => {
   useScrollAnimation();
const router = useRouter();
  useEffect(() => {
    // Smooth scroll for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  return (
    <main className="min-h-screen flex flex-col gap-20">
     
     
      <Hero />
      <HowItWorks />
       <BeforeAfter />
      <EditingFeatures />
     
      <PrintOptions />
      <FinalCTA />
      

      
    </main>
  );
};

export default page;
