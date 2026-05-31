"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
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
import { iconMap } from "@/components/dashboard/sections/dsa/data";
import { FaCode } from "react-icons/fa";

/* ====================================================== */
/* TYPES */
/* ====================================================== */

type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "language"
  | "tool"
  | "cloud"
  | "other";

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const EditSkill = () => {
  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [level, setLevel] = useState(80);
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const DynamicIcon = iconMap[icon as keyof typeof iconMap] || FaCode;
  /* ====================================================== */
  /* COMPLETION */
  /* ====================================================== */

  const completion = useMemo(() => {
    let done = 0;

    if (title.trim()) done++;
    if (icon.trim()) done++;
    if (level > 0) done++;
    if (category) done++;
    if (order >= 0) done++;

    return Math.round((done / 5) * 100);
  }, [title, icon, level, category, order]);

  /* ====================================================== */
  /* PREFILL DATA */
  /* ====================================================== */
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        const skill = data.skill;

        setTitle(skill.title);
        setIcon(skill.icon);
        setLevel(skill.level);
        setCategory(skill.category);
        setFeatured(skill.featured);
        setOrder(skill.order);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (id) {
      getSkill();
    }
  }, [id]);

  /* ====================================================== */
  /* SUBMIT */
  /* ====================================================== */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title.trim()) {
        toast.error("Skill title is required");
        return;
      }

      if (!icon.trim()) {
        toast.error("Skill icon is required");
        return;
      }

      const payload = {
        title,
        icon,
        level,
        category,
        featured,
        order,
      };

      const response = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to edit skill");
      }

      toast.success("Skill edited successfully");

      setTitle("");
      setIcon("");
      setLevel(80);
      setCategory("frontend");
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
              <Link href="/dashboard/skills">
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
                  Create Skill
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
                    <CardTitle className="text-xl">Skill Information</CardTitle>

                    <CardDescription>Add your skill details</CardDescription>
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
                      Enter your Skill details
                    </p>
                  </div>

                  {/* TITLE */}

                  <div className="space-y-2">
                    <Label>Title</Label>

                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="React js"
                      className="
                        h-12
                        rounded-2xl
                        border-border/60
                        bg-background/50
                      "
                    />
                  </div>

                  {/* ICON */}

                  <div className="space-y-2">
                    <Label>Icon Name</Label>

                    <Input
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="SiReact"
                      className="
                        h-12
                        rounded-2xl
                        border-border/60
                        bg-background/50
                      "
                    />
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
                      Manage your skill settings
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {/* CATEGORY */}

                    <div className="space-y-2">
                      <Label>Category</Label>

                      <Select
                        value={category}
                        onValueChange={(value) =>
                          setCategory(value as SkillCategory)
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
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                          <SelectItem value="tool">Tool</SelectItem>
                          <SelectItem value="cloud">Cloud</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Skill Level (%)</Label>

                      <Input
                        type="number"
                        min={1}
                        max={100}
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        className="h-12 rounded-2xl"
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
                        Highlight this Skill profile
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

                    <CardDescription>Real-time Skill preview</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* ====================================================== */}
                {/* SKILL PREVIEW */}
                {/* ====================================================== */}

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
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
          text-3xl
        "
                    >
                      <DynamicIcon className="h-8 w-8" />
                    </div>

                    <div>
                      <h2
                        className="
            text-2xl
            font-bold
            tracking-tight
          "
                      >
                        {title || "Untitled Skill"}
                      </h2>

                      <p
                        className="
            text-sm
            font-medium
            text-primary
            capitalize
          "
                      >
                        {category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* BADGES */}
                {/* ====================================================== */}

                <div className="flex flex-wrap gap-2">
                  <Badge
                    className="
        rounded-xl
        px-3
        py-1
        capitalize
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
                    {level}% Level
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

                {/* ====================================================== */}
                {/* SKILL LEVEL */}
                {/* ====================================================== */}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="
          text-sm
          font-medium
        "
                    >
                      Proficiency
                    </span>

                    <span
                      className="
          text-sm
          font-bold
          text-primary
        "
                    >
                      {level}%
                    </span>
                  </div>

                  <div
                    className="
        h-3
        overflow-hidden
        rounded-full
        bg-muted
      "
                  >
                    <div
                      className="
          h-full
          rounded-full
          bg-linear-to-r
          from-primary
          via-primary/80
          to-primary
          transition-all
          duration-500
        "
                      style={{
                        width: `${level}%`,
                      }}
                    />
                  </div>
                </div>

                {/* ====================================================== */}
                {/* STATS */}
                {/* ====================================================== */}

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
                      <Rocket
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
                        Level
                      </span>
                    </div>

                    <h3
                      className="
          text-2xl
          font-bold
        "
                    >
                      {level}%
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

                {/* ====================================================== */}
                {/* META */}
                {/* ====================================================== */}

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

                  <div
                    className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-border/50
        bg-background/40
        p-4"
                  >
                    <div
                      className="
          flex
          items-center
          gap-3
        "
                    >
                      <Layers3
                        className="
            h-4
            w-4
            text-primary
          "
                      />

                      <span className="text-sm">Category</span>
                    </div>

                    <span className="font-semibold capitalize">{category}</span>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* ACTION */}
                {/* ====================================================== */}

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
                  {loading ? "Editing Skill..." : "Edit Skill"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditSkill;
