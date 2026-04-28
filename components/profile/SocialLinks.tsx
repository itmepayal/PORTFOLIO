"use client";

/* =========================
   EXTERNAL DEPENDENCIES
   ========================= */
import { motion } from "framer-motion";

/* =========================
   TYPES
   ========================= */
type IconType = React.ComponentType<{ className?: string }>;

type Props = {
  socials: { icon: IconType; url: string }[];
};

/* =========================================================
   COMPONENT: SocialLinks
   ========================================================= */
export const SocialLinks = ({ socials }: Props) => {
  return (
    /* =========================
       WRAPPER 
       ========================= */
    <div className="flex justify-center gap-5 pt-2">
      {/* -------------------------
          SOCIAL ICON LINKS
         ------------------------- */}
      {socials.map(({ icon: Icon, url }, i) => (
        <motion.a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, scale: 1.1 }}
          className="text-gray-400 hover:text-white transition"
        >
          <Icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  );
};
