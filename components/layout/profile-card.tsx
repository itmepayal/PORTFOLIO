"use client";

import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  GraduationCap,
  Code2,
  Target,
  Activity,
  CheckCircle2,
} from "lucide-react";
import {
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

// =========================================
// PROFILE DASHBOARD
// =========================================
export const ProfileCard = () => {
  const problemSolving = {
    total: 366,
    leetcode: 111,
    striver: 255,
  };

  const nowWorking = [
    { name: "Backend Systems", icon: Server, progress: 85 },
    { name: "System Design", icon: GitBranch, progress: 70 },
    { name: "DSA", icon: Code2, progress: 75 },
  ];

  return (
    <div className="flex justify-center min-h-screen px-3 py-3 bg-linear-to-b from-background to-muted/20">
      {/* ================= FIXED CARD ================= */}
      <div className="w-full max-w-sm rounded-3xl border backdrop-blur-2xl shadow-2xl px-5 py-5 space-y-3">
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <Image
                  src="/profile.jpeg"
                  alt="profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Payal Yadav
          </h2>

          <Badge className="text-xs bg-primary/10 text-primary px-3 py-1">
            Full Stack Developer
          </Badge>

          {/* ================= EDUCATION INLINE ================= */}
          <p className="flex items-center justify-center gap-1 text-muted-foreground">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium text-foreground text-sm">
              MCA • Computer Science
            </span>
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Backend-focused developer building scalable systems & clean APIs
            with production-ready architecture.
          </p>
        </div>

        {/* ================= PROBLEM SOLVING ================= */}
        <div className="rounded-2xl border bg-background/20 p-4 space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Code2 className="w-4 h-4 text-primary" />
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Problem Solving
            </p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">{problemSolving.total}+</p>
            <p className="text-xs text-muted-foreground">
              Problems solved across platforms
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 rounded-xl bg-background/30">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Total
              </span>
              <span className="font-semibold">{problemSolving.total}</span>
            </div>

            <div className="flex items-center justify-between text-sm p-2 rounded-xl bg-background/30">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                LeetCode
              </span>
              <span className="font-semibold">{problemSolving.leetcode}</span>
            </div>

            <div className="flex items-center justify-between text-sm p-2 rounded-xl bg-background/30">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                Striver
              </span>
              <span className="font-semibold">{problemSolving.striver}</span>
            </div>
          </div>
        </div>

        {/* ================= FOCUS AREAS ================= */}
        <div className="rounded-2xl border bg-background/20 p-4 space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Target className="w-4 h-4 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Technical Focus
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "Backend", icon: Server },
              { name: "APIs", icon: LinkIcon },
              { name: "System", icon: GitBranch },
              { name: "Database", icon: Database },
              { name: "Arch", icon: Layers },
              { name: "Scale", icon: Activity },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-background/30 text-[10px] text-center"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="leading-tight">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= CURRENT WORK ================= */}
        {/* ================= CURRENT FOCUS ================= */}
        {/* ================= CURRENT FOCUS (COMPACT) ================= */}
        <div className="rounded-2xl border bg-background/20 p-3 space-y-2">
          <div className="flex items-center gap-2 justify-center">
            <Activity className="w-4 h-4 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Current Focus
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {nowWorking.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-background/30 text-[10px]"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="leading-tight text-center">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
