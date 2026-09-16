import React from "react";

interface GenesisLogoProps {
  variant?: "full" | "mark" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const GenesisLogo: React.FC<GenesisLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const titleSizes = {
    sm: "text-base tracking-[0.2em]",
    md: "text-lg tracking-[0.22em]",
    lg: "text-2xl tracking-[0.25em]",
    xl: "text-3xl tracking-[0.28em]",
  };

  const subSizes = {
    sm: "text-[8px] tracking-[0.35em]",
    md: "text-[9px] tracking-[0.38em]",
    lg: "text-[11px] tracking-[0.42em]",
    xl: "text-[13px] tracking-[0.45em]",
  };

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`} id="genesis-brand-logo">
      {/* Metallic Silver Globe with Red Radiant Lighting */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        {/* Subtle red lighting halo behind the globe */}
        <div className="absolute inset-0 rounded-full bg-[#B00000] blur-[8px] opacity-45 transform scale-110 pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Metallic chrome gradient */}
            <radialGradient id="sphereMetallic" cx="36%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#EDEDED" />
              <stop offset="55%" stopColor="#A6A9AD" />
              <stop offset="85%" stopColor="#4A4E54" />
              <stop offset="100%" stopColor="#15171A" />
            </radialGradient>

            {/* Carmine red rim reflection */}
            <radialGradient id="redRimGlow" cx="82%" cy="75%" r="55%">
              <stop offset="0%" stopColor="#FF3333" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#B00000" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#660000" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Specular bright highlight */}
            <linearGradient id="chromeHighlight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C0C0C0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base sphere with metallic surface */}
          <circle cx="50" cy="50" r="44" fill="url(#sphereMetallic)" />

          {/* Red lighting glow layered on right hemisphere */}
          <circle cx="50" cy="50" r="44" fill="url(#redRimGlow)" />

          {/* Latitude & Longitude precision lines */}
          <ellipse cx="50" cy="50" rx="44" ry="44" stroke="#4A4E54" strokeWidth="1" opacity="0.4" />
          
          {/* Vertical meridian arcs */}
          <ellipse cx="50" cy="50" rx="34" ry="43.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.45" />
          <ellipse cx="50" cy="50" rx="20" ry="43.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
          <ellipse cx="50" cy="50" rx="7" ry="43.5" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <line x1="50" y1="6.5" x2="50" y2="93.5" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />

          {/* Horizontal parallel arcs */}
          <ellipse cx="50" cy="50" rx="43.5" ry="16" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
          <line x1="6.5" y1="50" x2="93.5" y2="50" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.75" />
          <ellipse cx="50" cy="32" rx="38" ry="12" stroke="#D1D5DB" strokeWidth="1" opacity="0.45" />
          <ellipse cx="50" cy="68" rx="38" ry="12" stroke="#D1D5DB" strokeWidth="1" opacity="0.45" />

          {/* Outer metallic bezel ring with red accent stroke */}
          <circle cx="50" cy="50" r="44" stroke="url(#chromeHighlight)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="44" stroke="#B00000" strokeWidth="1.5" strokeDasharray="35 150" strokeDashoffset="45" opacity="0.85" />

          {/* Hot focal flare */}
          <circle cx="34" cy="30" r="4" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 0 4px #FFFFFF)" />
        </svg>
      </div>

      {/* Typography Lockup */}
      {variant !== "mark" && (
        <div className="flex flex-col justify-center">
          <span className={`font-serif font-bold text-white leading-none ${titleSizes[size]}`}>
            GENESIS
          </span>
          <span className={`font-sans font-semibold text-[#B8B8B8] leading-tight uppercase ${subSizes[size]}`}>
            FINANCIAL
          </span>
        </div>
      )}
    </div>
  );
};
