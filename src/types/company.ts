export interface CompanyStats {
  label: string;
  value: string;
}

export interface ValueItem {
  id: string;
  label: string;
  description: string;
}

export interface CompanyService {
  title: string;
  description: string;
  icon?: string;
}

export interface CompanyData {
  siteName: string;
  fullName: string;
  tagline: string;
  established: number;
  headquarters: string;
  navLinks: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  about: {
    headline: string;
    description: string;
    stats: CompanyStats[];
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  services: CompanyService[];
  footer: {
    address: string;
    phone: string;
    email: string;
    tagline: string;
    copyright: string;
  };
  outro: {
    headline: string;
    subheadline: string;
    cta: {
      href: string;
      label: string;
    };
  };
}
