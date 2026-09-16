import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GenesisLogo } from "./GenesisLogo";
import { LegalDocType } from "./DisclosuresModal";

interface FooterProps {
  onOpenLegal: (docType: LegalDocType) => void;
  onBookCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onBookCall }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Opportunity", href: "#opportunity" },
    { label: "Why Genesis", href: "#why-genesis" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#book-call" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#040404] border-t border-neutral-900 pt-10 sm:pt-16 pb-8 sm:pb-12 text-left text-neutral-400" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-12 pb-8 sm:pb-14 border-b border-neutral-900">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-4 space-y-2.5 sm:space-y-4">
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="inline-block">
              <GenesisLogo size="sm" />
            </a>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              Empowering motivated professionals to build enduring independent careers in financial services and life insurance.
            </p>
            <div className="pt-1 sm:pt-2">
              <button
                onClick={onBookCall}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                id="footer-book-call-btn"
              >
                Schedule Introduction
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-span-1 lg:col-span-2 space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="col-span-1 lg:col-span-3 space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Contact Us
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B00000] shrink-0" />
                <span className="text-neutral-300 font-mono text-[11px] sm:text-xs truncate">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B00000] shrink-0" />
                <span className="text-neutral-300 font-mono text-[11px] sm:text-xs">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B00000] shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-[11px] sm:text-xs">{siteConfig.contact.location}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Links & Compliance */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-4">
            <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Connect With Genesis
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#111111] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-relaxed">
              Recruitment and carrier representation opportunities. Connect with leadership regarding licensing in your jurisdiction.
            </p>
          </div>
        </div>

        {/* Bottom Bar with Legal and Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-row items-center justify-between gap-2 text-[10px] sm:text-xs">
          <p className="text-neutral-500 truncate">
            © {siteConfig.legal.copyrightYear} Genesis Financial.
          </p>

          <div className="flex items-center gap-3 sm:gap-6 text-neutral-400 shrink-0">
            <button
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => onOpenLegal("terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => onOpenLegal("disclosures")}
              className="hover:text-[#FF4D4D] transition-colors cursor-pointer"
            >
              Disclosures
            </button>
            <button
              onClick={scrollToTop}
              className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors ml-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
