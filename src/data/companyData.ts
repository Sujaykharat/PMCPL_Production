import { CompanyData } from "@/types/company";

export const companyData: CompanyData = {
  siteName: "PMCPL",
  fullName: "Pioneer Management Consultant Pvt. Ltd.",
  tagline: "Connecting Top Talent with Industry Leaders since 1996",
  established: 1996,
  headquarters: "Navi Mumbai, India",
  navLinks: [
    { label: "Home", href: "/home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Trusted Recruitment Partners",
    headline: "Building the Bridge Between Talent and Opportunity",
    subheadline:
      "A professional recruitment and manpower management consultancy dedicated to the Manufacturing and Non-IT sectors for over 28 years.",
    primaryCta: { label: "Explore Services", href: "#services" },
    secondaryCta: { label: "Contact Us", href: "#contact" },
  },
  about: {
    headline: "Our Legacy of Excellence",
    description: "Established in 1996, Pioneer Management Consultant Pvt. Ltd. (PMCPL) has grown into a premier sourcing consultant, acting as a vital link between the industry's top talent and leading organizations. Headquartered in Navi Mumbai, we specialize in understanding the unique needs of both recruiters and job seekers.",
    stats: [
      { label: "Years of Experience", value: "28+" },
      { label: "Clients Served", value: "500+" },
      { label: "Positions Filled", value: "10,000+" },
      { label: "Industries", value: "15+" },
    ]
  },
  values: {
    title: "The RAISE Framework",
    items: [
      { id: "R", label: "Respect", description: "Valuing every individual and relationship." },
      { id: "A", label: "Accountability", description: "Taking ownership of our results and commitments." },
      { id: "I", label: "Integrity", description: "Operating with transparency and ethics." },
      { id: "S", label: "Service Commitment", description: "Dedicated to exceeding client expectations." },
      { id: "E", label: "Ethic", description: "Upholding the highest professional standards." },
    ]
  },
  services: [
    {
      title: "Executive Search & Selection",
      description: "Identifying and recruiting business leaders who drive growth and innovation.",
      icon: "UserSearch"
    },
    {
      title: "Recruitment Solutions",
      description: "End-to-end hiring services for various levels in Manufacturing and Non-IT sectors.",
      icon: "Users"
    },
    {
      title: "Manpower Management",
      description: "Comprehensive solutions including temporary, contract, and permanent staffing.",
      icon: "ShieldCheck"
    },
    {
      title: "RPO Services",
      description: "Recruitment Process Outsourcing to optimize your internal hiring lifecycle.",
      icon: "Briefcase"
    }
  ],
  outro: {
    headline: "Your headline",
    subheadline: "Your subheadline",
    cta: {
      href: "/contact",
      label: "Get Started"
    }
  },
  footer: {
    address: "CBD-Belapur, Navi Mumbai, Maharashtra",
    phone: "+91 22 1234 5678",
    email: "contact@pmcpl-india.com",
    tagline: "Building Bridges between Talent and Opportunities since 1996.",
    copyright: `© ${new Date().getFullYear()} Pioneer Management Consultant Pvt. Ltd. All rights reserved.`,
  },
} as const;
