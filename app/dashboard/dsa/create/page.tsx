"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Layers3,
  Star,
  Rocket,
  Activity,
  BadgeCheck,
  Sparkles,
  Trophy,
  Brain,
  Target,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

type DSACategory = "leetcode" | "striver" | "codeforces" | "gfg" | "custom";

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const CreateDSA = () => {
  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState("0%");
  const [category, setCategory] = useState<DSACategory>("custom");
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ====================================================== */
  /* COMPLETION */
  /* ====================================================== */

  const completion = useMemo(() => {
    let done = 0;
    if (title) done++;
    if (subtitle) done++;
    if (desc.length >= 20) done++;
    if (progress) done++;
    if (problemsSolved >= 0) done++;
    if (category) done++;
    return Math.round((done / 6) * 100);
  }, [title, subtitle, desc, progress, problemsSolved, category]);

  /* ====================================================== */
  /* SUBMIT */
  /* ====================================================== */

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (!subtitle.trim()) {
        toast.error("Subtitle is required");
        return;
      }

      if (desc.trim().length < 20) {
        toast.error("Description must be at least 20 characters");
        return;
      }

      const payload = {
        title,
        subtitle,
        desc,
        progress,
        category,
        problemsSolved,
        featured,
        order,
      };

      const response = await fetch("/api/dsa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("DSA entry created successfully");
      setTitle("");
      setSubtitle("");
      setDesc("");
      setProgress("0%");
      setCategory("custom");
      setProblemsSolved(0);
      setFeatured(false);
      setOrder(0);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]
      "
    >
      <div
        className="
          mx-auto
          w-full
        "
      >
        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            mb-8
            overflow-hidden
            rounded-4xl
            border
            border-border/50
            bg-background/70
            p-6
            shadow-[0_10px_50px_rgba(0,0,0,0.08)]
            backdrop-blur-xl
          "
        >
          {/* BACKGROUND */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-linear-to-r
              from-primary/10
              via-transparent
              to-primary/5
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-5">
              <Link href="/dashboard/dsa">
                <Button
                  variant="outline"
                  className="
                    h-11
                    rounded-2xl
                  "
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-primary/10
                  text-primary
                "
              >
                <Brain className="h-8 w-8" />
              </div>

              <div>
                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                  "
                >
                  Create DSA Entry
                </h1>

                <p
                  className="
                    mt-1
                    text-muted-foreground
                  "
                >
                  Track your coding progress professionally
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="hidden md:block">
              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  text-sm
                "
              >
                <span className="text-muted-foreground">Completion</span>

                <span className="font-semibold">{completion}%</span>
              </div>

              <div
                className="
                  h-2
                  w-56
                  overflow-hidden
                  rounded-full
                  bg-muted
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-primary
                    transition-all
                  "
                  style={{
                    width: `${completion}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* GRID */}
        {/* ====================================================== */}

        <div
          className="
            grid
            gap-8
            xl:grid-cols-[1fr_380px]
          "
        >
          {/* ====================================================== */}
          {/* LEFT FORM */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <Card
              className="
                rounded-4xl
                border-border/50
                bg-background/70
                shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* TOP BORDER */}

              <div
                className="
                  h-1.5
                  w-full
                  rounded-t-4xl
                  bg-linear-to-r
                  from-primary
                  via-primary/60
                  to-primary
                "
              />

              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle className="text-xl">DSA Information</CardTitle>

                    <CardDescription>
                      Add your coding journey details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* ====================================================== */}
                {/* BASIC INFO */}
                {/* ====================================================== */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-border/50
                    bg-muted/20
                    p-6
                    space-y-6
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        tracking-tight
                      "
                    >
                      Basic Information
                    </h3>

                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Enter your DSA profile details
                    </p>
                  </div>

                  {/* TITLE */}

                  <div className="space-y-2">
                    <Label>Title</Label>

                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="450+ Problems Solved"
                      className="
                        h-12
                        rounded-2xl
                        border-border/60
                        bg-background/50
                      "
                    />
                  </div>

                  {/* SUBTITLE */}

                  <div className="space-y-2">
                    <Label>Subtitle</Label>

                    <Input
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="LeetCode Journey"
                      className="
                        h-12
                        rounded-2xl
                        border-border/60
                        bg-background/50
                      "
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div className="space-y-2">
                    <Label>Description</Label>

                    <Textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Write detailed DSA journey description..."
                      className="
                        min-h-40
                        resize-none
                        rounded-3xl
                        border-border/60
                        bg-background/50
                      "
                    />

                    <div className="flex justify-end">
                      <span
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {desc.length}/500
                      </span>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* CONFIG */}
                {/* ====================================================== */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-border/50
                    bg-muted/20
                    p-6
                    space-y-6
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        tracking-tight
                      "
                    >
                      Configuration
                    </h3>

                    <p
                      className="
                        text-sm
                        text-muted-foreground
                      "
                    >
                      Manage your DSA settings
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* CATEGORY */}

                    <div className="space-y-2">
                      <Label>Category</Label>

                      <Select
                        value={category}
                        onValueChange={(value) =>
                          setCategory(value as DSACategory)
                        }
                      >
                        <SelectTrigger
                          className="
                            h-12!
                            w-full
                            rounded-2xl
                          "
                        >
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="leetcode">LeetCode</SelectItem>

                          <SelectItem value="striver">Striver</SelectItem>

                          <SelectItem value="codeforces">Codeforces</SelectItem>

                          <SelectItem value="gfg">GFG</SelectItem>

                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* PROGRESS */}

                    <div className="space-y-2">
                      <Label>Progress</Label>

                      <Input
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        placeholder="85%"
                        className="
                          h-12
                          rounded-2xl
                        "
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* PROBLEMS */}

                    <div className="space-y-2">
                      <Label>Problems Solved</Label>

                      <Input
                        type="number"
                        value={problemsSolved}
                        onChange={(e) =>
                          setProblemsSolved(Number(e.target.value))
                        }
                        className="
                          h-12
                          rounded-2xl
                        "
                      />
                    </div>

                    {/* ORDER */}

                    <div className="space-y-2">
                      <Label>Display Order</Label>

                      <Input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                        className="
                          h-12
                          rounded-2xl
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* FEATURED */}
                {/* ====================================================== */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-border/50
                    bg-muted/20
                    p-6
                    space-y-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-lg
                          font-semibold
                        "
                      >
                        Featured Entry
                      </h3>

                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        Highlight this DSA profile
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFeatured(!featured)}
                      className={`
    group
    relative
    h-12
    overflow-hidden
    rounded-2xl
    border
    px-5
    font-semibold
    transition-all
    duration-300
    hover:scale-[1.02]
    active:scale-[0.98]
    ${
      featured
        ? `
          border-primary/30
          bg-primary
          text-primary-foreground
          shadow-lg
          shadow-primary/20
          hover:bg-primary/90
        `
        : `
          border-border/60
          bg-background
          hover:border-primary/40
          hover:bg-primary/5
        `
    }
  `}
                    >
                      <span
                        className={`
    relative
    z-10
    flex
    items-center
    gap-2
    ${featured ? "text-white font-medium" : ""}
  `}
                      >
                        <Star
                          className={`
      h-4
      w-4
      transition-all
      duration-300
      ${
        featured
          ? "fill-current scale-110 text-yellow-400"
          : "group-hover:rotate-12"
      }
    `}
                        />

                        {featured ? "Featured" : "Mark as Featured"}
                      </span>

                      <div
                        className={`
      absolute
      inset-0
      opacity-0
      transition-opacity
      duration-300
      group-hover:opacity-100
      ${
        featured ? "bg-white/10" : "bg-linear-to-r from-primary/5 to-primary/10"
      }
    `}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="space-y-6"
          >
            <Card
              className="
                sticky
                top-6
                rounded-4xl
                border-border/50
                bg-background/70
                backdrop-blur-xl
              "
            >
              {/* HEADER */}

              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle>Live Preview</CardTitle>

                    <CardDescription>Real-time DSA preview</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* TITLE */}

                <div className="space-y-3">
                  <h2
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                    "
                  >
                    {title || "Untitled DSA Entry"}
                  </h2>

                  <p
                    className="
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {subtitle || "Subtitle preview"}
                  </p>

                  <p
                    className="
                      line-clamp-4
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {desc || "Description preview will appear here."}
                  </p>
                </div>

                {/* BADGES */}

                <div className="flex flex-wrap gap-2">
                  <Badge
                    className="
                      rounded-xl
                      px-3
                      py-1
                    "
                  >
                    {category}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="
                      rounded-xl
                      px-3
                      py-1
                    "
                  >
                    {progress}
                  </Badge>

                  {featured && (
                    <Badge
                      className="
                        rounded-xl
                        px-3
                        py-1
                      "
                    >
                      Featured
                    </Badge>
                  )}
                </div>

                {/* STATS */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                  "
                >
                  <div
                    className="
                      rounded-2xl
                      border
                      border-border/50
                      bg-background/40
                      p-4
                    "
                  >
                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Trophy
                        className="
                          h-4
                          w-4
                          text-primary
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        Solved
                      </span>
                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {problemsSolved}
                    </h3>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-border/50
                      bg-background/40
                      p-4
                    "
                  >
                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <BarChart3
                        className="
                          h-4
                          w-4
                          text-primary
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        Order
                      </span>
                    </div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {order}
                    </h3>
                  </div>
                </div>

                {/* META */}

                <div className="space-y-3">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-border/50
                      bg-background/40
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <Activity
                        className="
                          h-4
                          w-4
                          text-primary
                        "
                      />

                      <span className="text-sm">Completion</span>
                    </div>
                    <span className="font-semibold">{completion}%</span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-border/50
                      bg-background/40
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <Target
                        className="
                          h-4
                          w-4
                          text-primary
                        "
                      />

                      <span className="text-sm">Featured</span>
                    </div>

                    <span className="font-semibold">
                      {featured ? "Yes" : "No"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-border/50
                      bg-background/40
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <BadgeCheck
                        className="
                          h-4
                          w-4
                          text-primary
                        "
                      />

                      <span className="text-sm">Status</span>
                    </div>

                    <span className="font-semibold">Active</span>
                  </div>
                </div>

                {/* ACTION */}

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="
                    h-12
                    w-full
                    rounded-2xl
                    font-medium
                    shadow-lg
                    shadow-primary/10
                  "
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {loading ? "Creating..." : "Create DSA Entry"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateDSA;
