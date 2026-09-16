import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Users } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

interface OpportunitySectionProps {
  onLearnMore: () => void;
  onBookCall: () => void;
}

export const OpportunitySection: React.FC<OpportunitySectionProps> = ({
  onBookCall,
}) => {
  const pillars = [
    {
      title: "Real Ownership",
      description: "Build client relationships & agency assets with lasting equity.",
      icon: <ShieldCheck className="w-5 h-5 text-[#FF4D4D]" />,
    },
    {
      title: "Proven Structure",
      description: "Step-by-step systems, training portals, and senior leadership guidance.",
      icon: <Compass className="w-5 h-5 text-[#FF4D4D]" />,
    },
    {
      title: "Winning Culture",
      description: "A collaborative, high-energy environment celebrating your milestones.",
      icon: <Users className="w-5 h-5 text-[#FF4D4D]" />,
    },
  ];

  return (
    <section id="opportunity" className="py-12 sm:py-28 bg-[#080808] border-b border-neutral-900 relative">
      {/* Subtle background glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#B00000]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Big Headline & Core Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-neutral-800 text-[11px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
              {siteConfig.opportunity.badge}
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              {siteConfig.opportunity.headline}
            </h2>

            <p className="font-serif text-lg sm:text-2xl text-[#E8E8E8] font-medium tracking-wide">
              {siteConfig.opportunity.subheadline}
            </p>

            <div className="space-y-3 sm:space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              <p>{siteConfig.opportunity.description1}</p>
              <p className="hidden sm:block">{siteConfig.opportunity.description2}</p>
            </div>

            <div className="pt-2 sm:pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookCall}
                className="group px-5 sm:px-7 py-3 sm:py-3.5 bg-[#B00000] hover:bg-[#C80000] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all inline-flex items-center gap-2 glow-red-subtle cursor-pointer min-h-[48px]"
                id="opportunity-book-call-btn"
              >
                <span>BOOK A CALL TO LEARN MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars Card Matrix (3 Columns on Mobile, stacked on Desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-3 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-[#101010] border border-neutral-800 hover:border-neutral-700 transition-all duration-200 group text-left shadow-lg flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-1.5 sm:gap-4">
                    {/* Top Row: Icon on left, Step number on right */}
                    <div className="flex items-center justify-between w-full lg:w-auto mb-1.5 lg:mb-0">
                      <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#050505] border border-neutral-800 shrink-0 group-hover:border-[#B00000]/50 transition-colors self-start">
                        {React.cloneElement(pillar.icon as React.ReactElement, {
                          className: "w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]",
                        })}
                      </div>
                      <span className="lg:hidden text-[10px] sm:text-[11px] font-mono text-neutral-500 font-semibold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="min-w-0 w-full">
                      <div className="hidden lg:flex items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-mono text-neutral-500">0{idx + 1}</span>
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#FF4D4D] transition-colors leading-tight">
                          {pillar.title}
                        </h3>
                      </div>
                      {/* Mobile Header */}
                      <h3 className="lg:hidden font-serif text-xs min-[380px]:text-sm font-bold text-white group-hover:text-[#FF4D4D] transition-colors leading-snug tracking-tight mb-1 break-words">
                        {pillar.title}
                      </h3>
                      <p className="text-neutral-400 text-[11px] sm:text-sm leading-snug sm:leading-relaxed font-light break-words">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-3 sm:p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800/80 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-400"
            >
              <CheckCircle2 className="w-4 h-4 text-[#B00000] shrink-0" />
              <span>Full licensing exam prep & regulatory orientation included.</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
