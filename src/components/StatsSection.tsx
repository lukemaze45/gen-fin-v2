import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TrendingUp, Users, Zap, Award, Sparkles, ArrowUpRight } from "lucide-react";

interface StatsSectionProps {
  onBookCall: () => void;
}

interface StatItem {
  id: string;
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  subtext: string;
  tag: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const STATS_DATA: StatItem[] = [
  {
    id: "income",
    prefix: "$",
    value: 120,
    suffix: "K+",
    label: "Avg 1st-Year Potential",
    subtext: "Uncapped, performance-based commission structure with no ceiling.",
    tag: "HIGH INCOME",
    icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]" />,
    highlight: true,
  },
  {
    id: "network",
    value: 500,
    suffix: "+",
    label: "Active Agents & Leaders",
    subtext: "A thriving national team of ambitious producers and mentors.",
    tag: "NATIONWIDE",
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]" />,
  },
  {
    id: "autonomy",
    value: 100,
    suffix: "%",
    label: "Schedule & Remote Freedom",
    subtext: "Total control over your time. Work remotely or build an agency.",
    tag: "ZERO 9-TO-5",
    icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]" />,
    highlight: true,
  },
  {
    id: "trackrecord",
    value: 15,
    suffix: "+",
    label: "Years Industry Leadership",
    subtext: "Proven operational systems and premier carrier partnerships.",
    tag: "PROVEN BACKING",
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D4D]" />,
  },
];

// Smooth Animated Counter component
const CounterTicker: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1400; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * (end - start) + start);
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isInView ? displayValue : 0}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC<StatsSectionProps> = ({ onBookCall }) => {
  return (
    <section className="py-12 sm:py-20 bg-[#070707] border-y border-neutral-900/80 relative overflow-hidden">
      {/* Background ambient red glow spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#B00000]/12 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#B00000]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Flashy Gen Z Banner / Live Cohort Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0F0F0F] border border-neutral-800/90 mb-6 sm:mb-10 text-center sm:text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B00000]" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              LIVE ONBOARDING COHORT ACTIVE
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1F1F1F] text-neutral-300 border border-neutral-700">
              Zero Licensing Fees Required Upfront
            </span>
          </div>

          <button
            onClick={onBookCall}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[#FF4D4D] hover:text-white transition-colors cursor-pointer"
          >
            <span>Claim an Exploratory Slot</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* 4 Stats Cards Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0D0D0D] border ${
                stat.highlight ? "border-neutral-700/80" : "border-neutral-800/80"
              } hover:border-[#B00000]/60 transition-all duration-300 flex flex-col justify-between text-left group overflow-hidden shadow-lg`}
            >
              {/* Subtle top red glow line on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B00000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Top Row: Icon + Gen Z Pill Tag */}
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#141414] border border-neutral-800 flex items-center justify-center group-hover:border-[#B00000]/50 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[9px] min-[380px]:text-[10px] sm:text-xs font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#161616] text-[#FF4D4D] border border-neutral-800 font-semibold uppercase">
                    {stat.tag}
                  </span>
                </div>

                {/* Big Flashy Number */}
                <div className="font-serif font-black text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-1 sm:mb-2 group-hover:text-gradient-silver transition-all">
                  <CounterTicker
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Stat Label */}
                <h3 className="font-serif text-xs min-[380px]:text-sm sm:text-base font-bold text-neutral-200 mb-1 leading-snug">
                  {stat.label}
                </h3>

                {/* Stat Subtext */}
                <p className="text-neutral-400 text-[11px] sm:text-xs font-light leading-relaxed">
                  {stat.subtext}
                </p>
              </div>

              {/* Bottom Micro Indicator */}
              <div className="pt-2.5 sm:pt-4 mt-2.5 sm:mt-4 border-t border-neutral-900/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                <span>VERIFIED METRIC</span>
                <Sparkles className="w-3 h-3 text-[#B00000]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Realistic Compliance Subtitle */}
        <p className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-neutral-500 font-mono">
          * Career opportunity with commission compensation. Earning potential reflects individual producer outcomes, licensing, and client production.
        </p>
      </div>
    </section>
  );
};
