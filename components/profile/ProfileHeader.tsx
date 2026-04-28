import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  role: string;
  status: string;
  education: string;
  bio: string;
  image: string;
};

export const ProfileHeader = ({
  name,
  role,
  status,
  education,
  bio,
  image,
}: Props) => {
  return (
    <div className="text-center space-y-3">
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="relative mx-auto w-fit">
          <div className="border-4 border-border rounded-full">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={image}
                alt="profile"
                width={160}
                height={160}
                className="object-cover w-full h-full hover:scale-110 transition"
              />
            </div>
          </div>

          <span className="absolute bottom-4 right-4 flex h-3 w-3">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative h-3 w-3 rounded-full bg-green-500" />
          </span>
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
        {name}
      </h2>

      <div className="flex justify-center gap-2 flex-wrap">
        <Badge className="text-xs px-3 py-1 bg-card border border-border text-white">
          {role}
        </Badge>
        <Badge className="text-xs px-3 py-1 bg-green-500/10 text-green-400 border-green-500/20">
          {status}
        </Badge>
      </div>

      <p className="flex items-center justify-center gap-1 text-gray-400">
        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-sm text-white">{education}</span>
      </p>

      <p className="text-sm text-gray-400 max-w-xs mx-auto">{bio}</p>
    </div>
  );
};
