import React, { useState, useEffect, useRef } from "react";
import { Menu, X, PhoneCall, ArrowUpRight } from "lucide-react";
import { GenesisLogo } from "./GenesisLogo";

interface NavbarProps {
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(68);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track header height for pixel-perfect mobile drawer placement
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isScrolled, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "OPPORTUNITY", href: "#opportunity" },
    { label: "WHY GENESIS", href: "#why-genesis" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#book-call" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-xl shadow-black/60"
            : "bg-[#050505]/80 backdrop-blur-sm border-b border-neutral-900/60 py-4 sm:py-5"
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - clean separation prevents duplicate render on mobile */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group focus:outline-none flex items-center"
            aria-label="Genesis Financial Home"
          >
            <span className="sm:hidden flex items-center">
              <GenesisLogo size="sm" />
            </span>
            <span className="hidden sm:inline-flex items-center">
              <GenesisLogo size="md" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs lg:text-[13px] font-semibold tracking-wider text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#B00000] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary CTA: Book a Call (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onBookCall}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#B00000] hover:bg-[#C50000] text-white text-xs lg:text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 glow-red-subtle cursor-pointer hover:shadow-[0_0_20px_rgba(176,0,0,0.45)]"
              id="nav-book-call-btn"
            >
              <span>BOOK A CALL</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions: Direct Book + Interactive Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onBookCall}
              className="px-3.5 py-2 bg-[#B00000] hover:bg-[#C50000] text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors cursor-pointer min-h-[40px]"
              id="mobile-nav-book-call-btn"
            >
              BOOK
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-lg text-neutral-200 hover:text-white bg-[#141414] active:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer select-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              id="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 text-white stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay: positioned immediately below header with full height */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-[#070707]/98 backdrop-blur-2xl border-t border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn"
          style={{
            top: `${headerHeight}px`,
            height: `calc(100dvh - ${headerHeight}px)`,
          }}
          id="mobile-nav-drawer"
        >
          <div className="flex flex-col text-left">
            <div className="pb-3 mb-2 border-b border-neutral-850 flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-widest text-[#FF4D4D] uppercase font-semibold">
                Menu
              </span>
              <span className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                Genesis Financial
              </span>
            </div>

            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-4 border-b border-neutral-850/80 text-lg font-serif font-bold tracking-wide text-neutral-200 hover:text-white hover:text-[#FF4D4D] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-[#FF4D4D] transition-colors" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Call to Action Footer */}
          <div className="pt-6 mt-4 border-t border-neutral-850 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCall();
              }}
              className="w-full py-4 bg-[#B00000] hover:bg-[#C80000] text-white text-sm font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2.5 transition-colors glow-red-subtle cursor-pointer min-h-[48px]"
              id="drawer-book-call-btn"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>BOOK A CALL</span>
            </button>

            <p className="text-center text-[11px] text-neutral-400 font-light">
              Explore your path in financial services with Genesis Financial.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
