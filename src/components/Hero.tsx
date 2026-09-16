import React from "react";
import { ArrowRight, PhoneCall, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { HeroGlobeVisual } from "./HeroGlobeVisual";

interface HeroProps {
  onBookCall: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCall, onLearnMore }) => {
  const actionButtons = (
    <div className="flex flex-row items-center gap-3 sm:gap-4">
      <button
        onClick={onBookCall}
        className="flex-1 sm:flex-initial px-4 sm:px-8 py-3 sm:py-4 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2 glow-red-subtle cursor-pointer hover:shadow-[0_0_30px_rgba(176,0,0,0.5)] min-h-[46px] sm:min-h-[52px]"
        id="hero-book-call-btn"
      >
        <PhoneCall className="w-4 h-4 text-white shrink-0" />
        <span className="whitespace-nowrap">BOOK A CALL</span>
        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </button>

      <button
        onClick={onLearnMore}
        className="flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-4 bg-[#101010] hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-[#E8E8E8] hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer min-h-[46px] sm:min-h-[52px]"
        id="hero-learn-more-btn"
      >
        <span className="whitespace-nowrap">LEARN MORE</span>
        <ChevronDown className="w-4 h-4 shrink-0" />
      </button>
    </div>
  );

  const trustMetrics = (
    <div className="pt-3 sm:pt-6 border-t border-neutral-900 grid grid-cols-3 gap-2 sm:gap-3 text-[11px] sm:text-sm text-neutral-400">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B00000] shrink-0" />
        <span className="font-medium text-neutral-300 truncate">Licensing Prep</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B00000] shrink-0" />
        <span className="font-medium text-neutral-300 truncate">Mentorship</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B00000] shrink-0" />
        <span className="font-medium text-neutral-300 truncate">Agency Model</span>
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[#B00000]/12 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B00000]/10 blur-[130px] pointer-events-none rounded-full" />
      
      {/* Subtle background grid lines for architectural financial precision */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Main Grid: Left Words, Right Globe directly side-by-side */}
        <div className="grid grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Recruitment Typography */}
          <div className="col-span-7 lg:col-span-7 flex flex-col text-left space-y-3 sm:space-y-6 lg:space-y-8">
            {/* Recruitment Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 self-start px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#101010] border border-neutral-800 text-[9px] sm:text-xs font-semibold tracking-wider text-[#B8B8B8] uppercase">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B00000] animate-pulse shrink-0" />
              <span>NOW RECRUITING AGENTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-2xl min-[370px]:text-[26px] min-[410px]:text-3xl sm:text-5xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.08]">
              <span className="block">{siteConfig.heroHeadline.line1}</span>
              <span className="block text-gradient-silver">{siteConfig.heroHeadline.line2}</span>
              <span className="block text-white">
                {siteConfig.heroHeadline.line3}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-base md:text-xl text-[#B8B8B8] font-light leading-snug sm:leading-relaxed max-w-2xl">
              {siteConfig.heroSupportingText}
            </p>

            {/* Desktop Action Buttons & Trust Indicators (inside column) */}
            <div className="hidden lg:flex flex-col space-y-6 pt-2">
              {actionButtons}
              {trustMetrics}
            </div>
          </div>

          {/* Right Column: Genesis Metallic Globe Visual placed directly beside the words */}
          <div className="col-span-5 lg:col-span-5 flex items-center justify-center w-full">
            <HeroGlobeVisual />
          </div>
        </div>

        {/* Mobile Action Buttons & Trust Indicators: full width underneath the words+globe row */}
        <div className="lg:hidden mt-5 sm:mt-8 space-y-4 sm:space-y-6">
          {actionButtons}
          {trustMetrics}
        </div>
      </div>
    </section>
  );
};
