import React from "react";
import { Quote, User } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig, TestimonialItem } from "@/lib/site-config";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-14 sm:py-28 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-left md:text-center max-w-3xl mx-auto mb-8 sm:mb-18 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-neutral-800 text-[11px] sm:text-xs font-mono tracking-widest text-[#FF4D4D] uppercase">
            AGENT STORIES
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            HEAR FROM<br />OUR AGENTS.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-lg md:mx-auto">
            Discover how professionals from diverse backgrounds launched and built their practices with Genesis Financial.
          </p>
        </motion.div>

        {/* 3-Column Layout: Maintained on both Mobile and Desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
          {siteConfig.testimonials.map((item: TestimonialItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-2.5 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-[#101010] border border-neutral-800 flex flex-col justify-between text-left hover:border-neutral-700 transition-colors shadow-lg overflow-hidden"
            >
              <div>
                <Quote className="w-4 h-4 sm:w-8 sm:h-8 text-[#B00000]/70 mb-2 sm:mb-5" />
                <p className="text-neutral-300 text-[10px] min-[370px]:text-[11px] sm:text-sm lg:text-base leading-snug sm:leading-relaxed italic mb-2.5 sm:mb-8 font-light break-words">
                  "{item.quote}"
                </p>
              </div>

              {/* Agent info footer */}
              <div className="pt-2 sm:pt-6 border-t border-neutral-800/80 flex flex-col min-[420px]:flex-row items-start min-[420px]:items-center gap-1.5 sm:gap-4">
                {/* Agent Photo / Placeholder */}
                <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-[#1A1A1A] border border-neutral-700 flex items-center justify-center text-neutral-400 shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-neutral-300" />
                </div>
                <div className="min-w-0 w-full">
                  <h3 className="font-serif text-[10px] min-[370px]:text-xs sm:text-sm font-bold text-white tracking-normal leading-tight break-words">
                    {item.name}
                  </h3>
                  <p className="text-[8.5px] min-[370px]:text-[10px] sm:text-[11px] text-neutral-400 font-sans uppercase tracking-normal leading-tight mt-0.5 break-words">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification transparency note */}
        <div className="mt-6 sm:mt-10 text-center">
          <p className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            * Testimonial slots reserved for verified Genesis Financial agent experiences.
          </p>
        </div>
      </div>
    </section>
  );
};
