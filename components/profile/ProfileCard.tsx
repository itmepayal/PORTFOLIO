import { ProfileHeader } from "./ProfileHeader";
import { SocialLinks } from "./SocialLinks";
import { StatsSection } from "./StatsSection";
import { TechStack } from "./TechStack";
import { profileData } from "@/data/profile";

export const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-3 py-3 md:py-0">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 rounded blur-2xl opacity-40" />
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
