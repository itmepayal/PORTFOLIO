import { Layers3, Monitor, Server, TrendingUp, Zap } from "lucide-react";

export const filterOptions = ["All", "Frontend", "Backend", "Featured"];

export const iconMap = {
  Layers3,
  Monitor,
  Server,
  TrendingUp,
  Zap,
};

export type IconName = keyof typeof iconMap;
