import { motion } from "framer-motion";

type IconType = React.ComponentType<{ className?: string }>;

type Props = {
  socials: { icon: IconType; url: string }[];
};

export const SocialLinks = ({ socials }: Props) => {
  return (
    <div className="flex justify-center gap-5 pt-2">
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
