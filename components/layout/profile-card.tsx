"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  GraduationCap,
  Code2,
  Target,
  Activity,
  Server,
  GitBranch,
  Link as LinkIcon,
  Database,
  Layers,
} from "lucide-react";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandLeetcode,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";

/* ---------------- CONSTANTS ---------------- */

const PROBLEM_SOLVING = {
  total: 366,
  leetcode: 111,
  striver: 255,
};

const SOCIAL_ICONS = [IconBrandGithub, IconBrandLinkedin, IconBrandLeetcode];

const TECH_STACK = [
  { name: "Backend Development", icon: Server },
  { name: "API Development", icon: LinkIcon },
  { name: "System Design", icon: GitBranch },
  { name: "Database Management", icon: Database },
  { name: "Software Architecture", icon: Layers },
  { name: "Scalability Engineering", icon: Activity },
];

/* ---------------- HOOK ---------------- */

const useCounter = (end: number, duration = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

/* ---------------- COMPONENT ---------------- */

export const ProfileCard = () => {
  const total = useCounter(PROBLEM_SOLVING.total, 1000);
  const leetcode = useCounter(PROBLEM_SOLVING.leetcode, 1400);
  const striver = useCounter(PROBLEM_SOLVING.striver, 1800);

  const progressData = [
    { label: "LeetCode", value: leetcode },
    { label: "Striver", value: striver },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-3">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-sm"
      >
        <div className="absolute inset-0 rounded-[28px]  blur-2xl opacity-40" />
        <div className="relative rounded-[28px] p-px">
          <div className="rounded-[28px] backdrop-blur-2xl px-6 py-6 space-y-5 border border-border transition-all duration-300">
            <div className="text-center space-y-2.5">
              <motion.div whileHover={{ scale: 1.05 }}>
                <div className="relative mx-auto w-fit">
                  <div className="border-4 border-white/10 rounded-full">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src="/profile.jpeg"
                        alt="profile"
                        width={160}
                        height={160}
                        className="object-cover w-full h-full hover:scale-110 transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <span className="absolute bottom-3 right-3 flex h-4 w-4">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative h-4 w-4 rounded-full bg-green-500" />
                  </span>
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Payal Yadav
              </h2>

              <div className="flex justify-center gap-2 flex-wrap">
                <Badge className="text-xs bg-white/10 text-white px-3 py-1 border border-white/10">
                  Full Stack Developer
                </Badge>
                <Badge className="text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                  Available
                </Badge>
              </div>

              <p className="flex items-center justify-center gap-1 text-gray-400">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-sm text-white">
                  MCA • Computer Science
                </span>
              </p>

              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Backend-focused developer building scalable systems & clean APIs
                with production-ready architecture.
              </p>

              {/* SOCIAL */}
              <div className="flex justify-center gap-5 pt-2">
                {SOCIAL_ICONS.map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="cursor-pointer text-gray-400 hover:text-white transition"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PROBLEM SOLVING */}
            <div className="border-y border-white/10 p-4 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <p className="text-xs uppercase text-gray-400 tracking-wider">
                  Problem Solving
                </p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-white">{total}+</p>
                <p className="text-xs text-gray-400">Problems solved</p>
              </div>

              {progressData.map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(value / total) * 100}%`,
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* TECH STACK */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Target className="w-4 h-4 text-pink-400" />
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Technical Focus
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {TECH_STACK.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-white/10 text-xs text-center hover:border-white/20 transition"
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-gray-300">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
