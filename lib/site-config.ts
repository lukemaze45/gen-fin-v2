/**
 * Genesis Financial - Site Configuration
 * 
 * Centralized configuration for all company details, recruitment messaging,
 * Calendly integration, contact info, and career opportunity assets.
 * 
 * When the client provides their actual Calendly URL, updating `calendlyUrl` here
 * will instantly update every "Book a Call" trigger across the entire website.
 */

export interface BenefitItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  photoUrl: string;
  isVerifiedPlaceholder: boolean;
}

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  isVerifiedPlaceholder: boolean;
}

export interface SiteConfig {
  companyName: string;
  brandAcro: string;
  tagline: string;
  heroHeadline: {
    line1: string;
    line2: string;
    line3: string;
  };
  heroSupportingText: string;
  calendlyUrl: string; // The client will provide the actual Calendly link later.
  contact: {
    email: string;
    phone: string;
    location: string;
    hours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  opportunity: {
    badge: string;
    headline: string;
    subheadline: string;
    description1: string;
    description2: string;
  };
  benefits: BenefitItem[];
  journeySteps: JourneyStep[];
  whoIsThisFor: {
    headline: string;
    subheadline: string;
    traits: Array<{
      title: string;
      description: string;
    }>;
    note: string;
  };
  testimonials: TestimonialItem[];
  about: {
    headline: string;
    subheadline: string;
    intro: string;
    mission: string;
    leadership: LeadershipMember[];
  };
  legal: {
    copyrightYear: number;
    disclaimer: string;
  };
}

export const siteConfig: SiteConfig = {
  companyName: "GENESIS FINANCIAL",
  brandAcro: "GENESIS",
  tagline: "Build Your Career. Build Your Future.",
  heroHeadline: {
    line1: "BUILD YOUR",
    line2: "FUTURE WITH",
    line3: "GENESIS.",
  },
  heroSupportingText:
    "Discover an opportunity to build a career in financial services with Genesis Financial.",
  
  // NOTE: Set your Calendly link here (e.g. "https://calendly.com/genesisfinancial/recruitment-call").
  // When empty, clicking "Book a Call" opens a dedicated scheduling assistant modal.
  calendlyUrl: "",

  contact: {
    email: "[INSERT VERIFIED EMAIL]",
    phone: "[INSERT VERIFIED PHONE]",
    location: "[INSERT VERIFIED LOCATION]",
    hours: "Monday – Friday: 9:00 AM – 6:00 PM EST",
  },

  socialLinks: {
    instagram: "https://instagram.com/[VERIFIED_HANDLE]",
    facebook: "https://facebook.com/[VERIFIED_PAGE]",
    linkedin: "https://linkedin.com/company/[VERIFIED_PAGE]",
  },

  opportunity: {
    badge: "CAREER OPPORTUNITY",
    headline: "MORE THAN A JOB.",
    subheadline: "BUILD SOMETHING FOR YOUR FUTURE.",
    description1:
      "Genesis Financial is looking for individuals who want more than just an ordinary 9-to-5. We provide a proven platform to develop a career in financial services and life insurance, helping individuals and families secure their financial well-being.",
    description2:
      "Whether you are looking to pivot from another industry or step into entrepreneurship with a dedicated support system, Genesis offers the mentorship, educational framework, and professional infrastructure to build long-term value.",
  },

  benefits: [
    {
      id: "training",
      category: "EDUCATION",
      title: "TRAINING",
      description:
        "Learn the knowledge and skills needed to develop in financial services through structured onboarding and continuous professional development.",
      iconName: "GraduationCap",
    },
    {
      id: "mentorship",
      category: "LEADERSHIP",
      title: "MENTORSHIP",
      description:
        "Receive guidance and direct support from experienced industry professionals committed to your growth and mastery.",
      iconName: "Compass",
    },
    {
      id: "support",
      category: "SYSTEMS",
      title: "SUPPORT",
      description:
        "Access the resources, carrier relationships, and turnkey back-office systems Genesis provides to empower your practice.",
      iconName: "ShieldCheck",
    },
    {
      id: "flexibility",
      category: "LIFESTYLE",
      title: "FLEXIBILITY",
      description:
        "Enjoy the autonomy to structure your schedule, manage your time, and balance your professional ambitions with personal life.",
      iconName: "Clock",
    },
    {
      id: "growth",
      category: "ADVANCEMENT",
      title: "GROWTH",
      description:
        "Develop your skills, expand your market reach, and pursue significant opportunities for upward professional progression.",
      iconName: "TrendingUp",
    },
    {
      id: "community",
      category: "CULTURE",
      title: "COMMUNITY",
      description:
        "Work alongside a collaborative team of high-caliber, ambitious professionals who celebrate each other's milestones.",
      iconName: "Users",
    },
  ],

  journeySteps: [
    {
      step: "01",
      title: "LEARN",
      description: "Learn about the Genesis opportunity, our philosophy, and what building a financial career looks like.",
    },
    {
      step: "02",
      title: "CONNECT",
      description: "Speak directly with the Genesis team to ask questions, discuss your background, and assess mutual fit.",
    },
    {
      step: "03",
      title: "GET STARTED",
      description: "Complete applicable licensing and onboarding requirements with step-by-step guidance from our staff.",
    },
    {
      step: "04",
      title: "BUILD",
      description: "Begin developing your client base, expanding your expertise, and building your career with Genesis.",
    },
  ],

  whoIsThisFor: {
    headline: "LOOKING FOR YOUR NEXT OPPORTUNITY?",
    subheadline: "WHO SUCCEEDS AT GENESIS FINANCIAL",
    traits: [
      {
        title: "Motivated & Driven",
        description: "You hold yourself to high standards and take personal accountability for your professional milestones.",
      },
      {
        title: "Willing to Learn",
        description: "Open to coachability, continuous education, and mastering industry fundamentals.",
      },
      {
        title: "Good with People",
        description: "Strong communication skills with genuine empathy for helping clients make sound financial decisions.",
      },
      {
        title: "Entrepreneurial Spirit",
        description: "Desire to build something lasting with the backing of an established firm and resources.",
      },
      {
        title: "Goal-Oriented",
        description: "Clear vision of your personal targets with the discipline to take daily action toward them.",
      },
      {
        title: "Interested in Financial Services",
        description: "Curious about wealth preservation, life insurance solutions, and family financial security.",
      },
    ],
    note: "Genesis Financial offers an independent business development opportunity. Prior financial experience is welcomed but not mandatory. Individual results depend entirely on personal effort, licensing, coachability, and regulatory compliance.",
  },

  testimonials: [
    {
      id: "testimonial-1",
      name: "[AGENT NAME]",
      role: "Financial Services Agent",
      location: "[INSERT LOCATION]",
      quote:
        "[INSERT VERIFIED TESTIMONIAL: How transitioning to Genesis provided the training, mentorship, and environment to establish a rewarding client practice.]",
      photoUrl: "",
      isVerifiedPlaceholder: true,
    },
    {
      id: "testimonial-2",
      name: "[AGENT NAME]",
      role: "Life Insurance Specialist",
      location: "[INSERT LOCATION]",
      quote:
        "[INSERT VERIFIED TESTIMONIAL: The guidance and collaborative team culture at Genesis made the licensing and onboarding process straightforward and empowering.]",
      photoUrl: "",
      isVerifiedPlaceholder: true,
    },
    {
      id: "testimonial-3",
      name: "[AGENT NAME]",
      role: "Agency Development Partner",
      location: "[INSERT LOCATION]",
      quote:
        "[INSERT VERIFIED TESTIMONIAL: Having access to premium carrier systems and senior leadership mentorship allowed me to scale my career with total confidence.]",
      photoUrl: "",
      isVerifiedPlaceholder: true,
    },
  ],

  about: {
    headline: "MEET GENESIS.",
    subheadline: "A PLATFORM BUILT FOR AMBITIOUS ADVISORS",
    intro:
      "Genesis Financial was established to empower motivated individuals to build thriving, independent careers in financial services and life insurance.",
    mission:
      "We believe that real growth happens when people are given the right mentorship, the right tools, and an uncompromising standard of excellence. Our agency culture is grounded in transparency, education, and mutual respect.",
    leadership: [
      {
        name: "[NAME]",
        role: "[POSITION]",
        bio: "[INSERT VERIFIED BIO: Leadership background, industry tenure, and commitment to mentoring incoming Genesis agents.]",
        photoUrl: "",
        isVerifiedPlaceholder: true,
      },
    ],
  },

  legal: {
    copyrightYear: 2026,
    disclaimer:
      "Genesis Financial is a financial services marketing and distribution organization. Agent opportunities involve independent contractor relationships. State and federal licensing and examination requirements apply prior to soliciting or offering insurance or financial products. Genesis Financial makes no guarantees of income, client acquisition, or career advancement. All results are contingent upon individual licensing, effort, and market conditions.",
  },
};
