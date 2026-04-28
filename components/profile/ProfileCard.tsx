"use client";

/* =========================
   COMPONENT IMPORTS
   ========================= */
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SocialLinks } from "@/components/profile/SocialLinks";
import { StatsSection } from "@/components/profile/StatsSection";
import { TechStack } from "@/components/profile/TechStack";

/* =========================
   DATA SOURCE
   ========================= */
import { profileData } from "@/data/profile";

export const Profile = () => {
  return (
    /* =========================
       PAGE WRAPPER
       ========================= */
    <div className="flex items-center justify-center min-h-screen px-3 py-3 md:py-0">
      {/* =========================
          CARD CONTAINER
         ========================= */}
      <div className="relative w-full max-w-sm">
        {/* -------------------------
            BACKGROUND GLOW
           ------------------------- */}
        <div className="absolute inset-0 rounded blur-2xl opacity-40" />

        {/* -------------------------
            MAIN CARD
           ------------------------- */}
        <div className="relative rounded-2xl backdrop-blur-2xl px-6 py-6 space-y-5 border border-border">
          <ProfileHeader {...profileData} />
          <SocialLinks socials={profileData.socials} />
          <StatsSection />
          <TechStack techStack={profileData.techStack} />
        </div>
      </div>
    </div>
  );
};
