import React from "react";
import { GraduationCap, Compass, ShieldCheck, Clock, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig, BenefitItem } from "@/lib/site-config";

interface BenefitsProps {
  onBookCall: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ onBookCall }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
      case "Compass":
        return <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
      case "Clock":
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
      case "Users":
      default:
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4D4D]" />;
    }
  };

  return (
    <section id="why-genesis" className="py-14 sm:py-28 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-left md:text-center max-w-3xl mx-auto mb-8 sm:mb-18 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] border border-neutral-800 text-[11px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
            AGENT ADVANTAGES
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            WHY GENESIS?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl md:mx-auto">
            We provide the infrastructure, licensing support, and executive mentorship you need to thrive in modern financial services.
          </p>
        </motion.div>

        {/* 6 Benefit Cards Grid: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7">
          {siteConfig.benefits.map((benefit: BenefitItem, index: number) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-3.5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0D0D0D] border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between text-left hover:shadow-2xl hover:shadow-black overflow-hidden"
            >
              {/* Subtle card red accent top bar on hover */}
              <div className="absolute top-0 left-4 right-4 sm:left-8 sm:right-8 h-[2px] bg-gradient-to-r from-transparent via-[#B00000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header with Icon and category */}
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-center group-hover:border-[#B00000]/40 transition-colors">
                    {getIcon(benefit.iconName)}
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-sm min-[380px]:text-base sm:text-2xl font-bold text-white mb-1.5 sm:mb-3 tracking-wide group-hover:text-white transition-colors leading-tight break-words">
                  {benefit.title}
                </h3>

                {/* Card Description */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light break-words">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-neutral-900 flex items-center justify-between text-[10px] sm:text-xs text-neutral-500">
                <span className="font-medium text-neutral-400 truncate">Genesis Standard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B00000] shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <button
            onClick={onBookCall}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 hover:text-white uppercase transition-colors group cursor-pointer"
          >
            <span>Questions about our agent benefits? Let's connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4D4D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
