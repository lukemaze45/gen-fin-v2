import React from "react";
import { UserCheck, Shield, Award, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { GenesisLogo } from "./GenesisLogo";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-28 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Brand & Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-3.5 sm:space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] border border-neutral-800 text-[11px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
              ABOUT THE FIRM
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              {siteConfig.about.headline}
            </h2>

            <p className="font-serif text-lg sm:text-xl text-neutral-300 font-medium">
              {siteConfig.about.subheadline}
            </p>

            <div className="space-y-2.5 sm:space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              <p>{siteConfig.about.intro}</p>
              <p className="hidden sm:block">{siteConfig.about.mission}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white font-serif font-bold text-sm sm:text-base">
                  <Shield className="w-4 h-4 text-[#FF4D4D] shrink-0" />
                  <span>Integrity First</span>
                </div>
                <p className="text-xs text-neutral-400 font-light">Uncompromising standards in every client interaction.</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D0D0D] border border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white font-serif font-bold text-sm sm:text-base">
                  <Award className="w-4 h-4 text-[#FF4D4D] shrink-0" />
                  <span>Elite Training</span>
                </div>
                <p className="text-xs text-neutral-400 font-light">Structured mentorship tailored to your ambitions.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Leadership Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="p-4 sm:p-10 rounded-xl sm:rounded-2xl bg-[#0F0F0F] border border-neutral-800 text-left shadow-2xl relative overflow-hidden group">
              {/* Subtle top accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B00000] to-transparent" />

              <div className="flex flex-row items-center gap-3.5 sm:gap-6 mb-3.5 sm:mb-6">
                {/* Leadership Avatar / Placeholder */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-[#181818] border border-neutral-700 flex items-center justify-center text-neutral-400 shrink-0 shadow-inner">
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-300" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF4D4D] uppercase">
                    Agency Leadership
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                    {siteConfig.about.leadership[0].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans uppercase tracking-wider mt-0.5">
                    {siteConfig.about.leadership[0].role}
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-neutral-800/80 pt-3.5 sm:pt-6">
                <p>{siteConfig.about.leadership[0].bio}</p>
              </div>

              <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B00000]" />
                  <span>Direct Mentorship Program</span>
                </span>
                <GenesisLogo variant="mark" size="sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
