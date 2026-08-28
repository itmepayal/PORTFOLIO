import type { Metadata } from "next";
import { getSiteUrl, SITE } from "@/lib/site";

export function buildRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${SITE.name} | ${SITE.title}`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    keywords: SITE.keywords,
    authors: [{ name: SITE.name, url: siteUrl }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: SITE.name,
      title: `${SITE.name} | ${SITE.title}`,
      description: SITE.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} | ${SITE.title}`,
      description: SITE.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon", type: "image/png", sizes: "32x32" },
      ],
      shortcut: "/favicon.svg",
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
  };
}

export const privateAreaMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export function buildProjectMetadata(project: {
  title: string;
  description: string;
  image?: string;
  _id: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/projects/${project._id}`;
  const description = project.description.slice(0, 160);
  const image = project.image?.trim() || undefined;

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      type: "article",
      images: image ? [{ url: image, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function buildExperienceMetadata(experience: {
  company: string;
  position: string;
  description: string;
  _id: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/experiences/${experience._id}`;
  const title = `${experience.position} at ${experience.company}`;
  const description = experience.description.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function buildPersonJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: siteUrl,
    email: SITE.email,
    jobTitle: SITE.title,
    knowsAbout: [
      "Backend Development",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "System Design",
      "TypeScript",
      "Next.js",
    ],
    sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.location,
    },
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE.name} Portfolio`,
    url: siteUrl,
    description: SITE.description,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
  };
}

export function buildCreativeWorkJsonLd(project: {
  title: string;
  description: string;
  image?: string;
  _id: string;
  createdAt?: string | Date;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/projects/${project._id}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url,
    image: project.image?.trim() || undefined,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: siteUrl,
    },
    dateCreated: project.createdAt
      ? new Date(project.createdAt).toISOString()
      : undefined,
  };
}

export function buildWorkExperienceJsonLd(experience: {
  company: string;
  position: string;
  description: string;
  location?: string;
  startDate: string;
  endDate?: string;
  _id: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/experiences/${experience._id}`;

  return {
    "@context": "https://schema.org",
    "@type": "EmployeeRole",
    name: experience.position,
    description: experience.description,
    url,
    roleName: experience.position,
    worksFor: {
      "@type": "Organization",
      name: experience.company,
    },
    employee: {
      "@type": "Person",
      name: SITE.name,
      url: siteUrl,
    },
    startDate: experience.startDate,
    endDate: experience.endDate === "Present" ? undefined : experience.endDate,
    location: experience.location,
  };
}

export function buildProfessionalServiceJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — Backend Engineering`,
    url: siteUrl,
    description: SITE.description,
    areaServed: SITE.location,
    email: SITE.email,
  };
}
