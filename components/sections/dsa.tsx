"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../common/container";
import { Award, Code2, TrendingUp, Trophy, Star, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DSAItem {
  _id: string;
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: string;
  problemsSolved: number;
  featured: boolean;
  order: number;
}

export const DSA = () => {
  const [dsaCards, setDsaCards] = useState<DSAItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDSA = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dsa");
        const data = await response.json();
        if (data.success) {
          const sortedData = data.dsa.sort(
            (a: DSAItem, b: DSAItem) => a.order - b.order,
          );
          setDsaCards(sortedData);
        }
      } catch (error) {
        console.error("Failed to fetch DSA data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDSA();
  }, []);
  return (
    <Container>
      {/* ====================================================== */}
      {/* SECTION */}
      {/* ====================================================== */}
      <section className="relative overflow-hidden">
        {/* ====================================================== */}
        {/* BACKGROUND GLOW */}
        {/* ====================================================== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-primary/10 blur-3xl" />
        {/* ====================================================== */}
        {/* CONTAINER */}
        {/* ====================================================== */}
        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* ====================================================== */}
            {/* TITLE */}
            {/* ====================================================== */}
            <div className="text-center mb-6 sm:mb-10">
              <p className=" inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-semibold">
                Data Structures & Algorithms
              </p>
              <h2 className="mt-5 text-3xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.05em] leading-none bg-linear-to-r from-foreground via-primary to-chart-3 bg-clip-text text-transparent">
                Problem Solving Journey
              </h2>
              <p className="mt-5 max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground leading-6 sm:leading-7">
                Consistent problem-solving practice focused on data structures,
                algorithms, backend interview preparation, and scalable
                thinking.
              </p>
            </div>
            {/* ====================================================== */}
            {/* GRID */}
            {/* ====================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dsaCards.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className=" group relative overflow-hidden rounded-4xl border border-border/50 bg-card/80 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)]"
                >
                  <div className="absolute inset-0 opacity-0 bg-radial from-primary/20 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-chart-1 via-chart-3 to-chart-2" />
                  <div className="absolute right-6 top-6 text-7xl font-black text-primary/10 select-none">
                    0{index + 1}
                  </div>
                  <div className="relative z-10 p-7">
                    <div className="flex items-center justify-between">
                      <Badge className="rounded-full bg-primary/10 text-primary border-primary/20">
                        <Code2 className="mr-1 h-3 w-3" />
                        {item.category}
                      </Badge>
                      {item.featured && (
                        <Badge className="rounded-full bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <Star className="mr-1 h-3 w-3 fill-current" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className=" mt-6 text-3xl font-black tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-primary font-semibold">
                      {item.subtitle}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground line-clamp-4">
                      {item.desc}
                    </p>
                    <div className="mt-7 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            Problems
                          </span>
                        </div>
                        <h4 className="mt-2 text-2xl font-bold">
                          {item.problemsSolved}
                        </h4>
                      </div>
                      <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            Progress
                          </span>
                        </div>
                        <h4 className="mt-2 text-2xl font-bold">
                          {item.progress}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-7">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          Completion
                        </span>
                        <span className="font-semiboldtext-primary">
                          {item.progress}
                        </span>
                      </div>
                      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: item.progress,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.4,
                          }}
                          className="h-full rounded-full bg-linear-to-r from-chart-1 via-chart-3 to-chart-2"
                        />
                        <div className="absolute inset-0 animate-pulse bg-white/10" />
                      </div>
                    </div>
                    <div className=" mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                      <span className=" text-xs text-muted-foreground">
                        DSA Journey #{item.order + 1}
                      </span>
                      <Sparkles className=" h-4 w-4 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};
