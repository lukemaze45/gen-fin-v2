import React from "react";
import { X, ShieldAlert, FileText, Lock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export type LegalDocType = "privacy" | "terms" | "disclosures";

interface DisclosuresModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export const DisclosuresModal: React.FC<DisclosuresModalProps> = ({
  isOpen,
  docType,
  onClose,
}) => {
  if (!isOpen) return null;

  const contentMap = {
    disclosures: {
      title: "Regulatory & Opportunity Disclosures",
      icon: <ShieldAlert className="w-5 h-5 text-[#FF4D4D]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <div className="p-4 bg-[#050505] border border-neutral-800 rounded-xl">
            <h4 className="font-semibold text-white mb-1">Independent Contractor Relationship</h4>
            <p className="text-neutral-400">
              {siteConfig.legal.disclaimer}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Licensing & Regulatory Compliance</h4>
            <p className="text-neutral-400">
              Solicitation and sale of insurance products, annuities, and financial services require obtaining and maintaining appropriate state resident or non-resident licenses (such as Life, Accident & Health) through accredited examinations and background checks in compliance with state insurance departments and regulatory authorities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Earnings & Compensation Representation</h4>
            <p className="text-neutral-400">
              Genesis Financial strictly prohibits misleading earnings or income representations. Individual results vary substantially and depend on individual skill, dedication, market conditions, licensing status, and carrier contracts. No level of income or success is guaranteed.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: <Lock className="w-5 h-5 text-[#FF4D4D]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            At Genesis Financial, we respect your privacy and are committed to protecting any personal information submitted through this website.
          </p>
          <div>
            <h4 className="font-semibold text-white mb-1">Information We Collect</h4>
            <p className="text-neutral-400">
              When you submit a recruitment inquiry or request a conversation, we collect contact information including your name, email address, phone number, and location. This information is utilized solely for communicating regarding the agent career opportunity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Information Sharing</h4>
            <p className="text-neutral-400">
              We do not sell, rent, or lease candidate contact details to third-party marketing brokers. Your data is handled strictly within Genesis Financial agency leadership and onboarding staff.
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      icon: <FileText className="w-5 h-5 text-[#FF4D4D]" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            By accessing and utilizing the Genesis Financial website, you agree to comply with these terms of use and applicable local regulations.
          </p>
          <div>
            <h4 className="font-semibold text-white mb-1">Use of Website Content</h4>
            <p className="text-neutral-400">
              All branding, logos, trademarks, and informational materials displayed on this site are the property of Genesis Financial. Materials may not be reproduced or distributed without prior written consent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Informational Purpose Only</h4>
            <p className="text-neutral-400">
              Content provided on this website is for informational and recruitment exploratory purposes only and does not constitute an offer of employment, investment advisory services, or legal advice.
            </p>
          </div>
        </div>
      ),
    },
  };

  const activeDoc = contentMap[docType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
      id="legal-modal-overlay"
    >
      <div
        className="relative w-full max-w-2xl bg-[#101010] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-left max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="legal-modal-content"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            {activeDoc.icon}
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              {activeDoc.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-5 pr-2">
          {activeDoc.body}
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
