import React, { useState } from "react";

const SKILLS_DATA = [
  { name: "React", icon: "⚛️", cat: "frontend", level: 5 },
  { name: "Next.js", icon: "▲", cat: "frontend", level: 4 },
  { name: "TypeScript", icon: "🔷", cat: "frontend", level: 4 },
  { name: "Tailwind", icon: "🌀", cat: "frontend", level: 4 },
  { name: "Node.js", icon: "🟢", cat: "backend", level: 5 },
  { name: "Express.js", icon: "🚂", cat: "backend", level: 5 },
  { name: "Python", icon: "🐍", cat: "backend", level: 4 },
  { name: "FastAPI", icon: "⚡", cat: "backend", level: 3 },
  { name: "GraphQL", icon: "🕸️", cat: "backend", level: 3 },
  { name: "REST APIs", icon: "🔗", cat: "backend", level: 5 },
  { name: "LangChain", icon: "🦜", cat: "ai", level: 4 },
  { name: "OpenAI API", icon: "🤖", cat: "ai", level: 5 },
  { name: "Vector DBs", icon: "📐", cat: "ai", level: 4 },
  { name: "RAG Systems", icon: "🔮", cat: "ai", level: 4 },
  { name: "Docker", icon: "🐳", cat: "devops", level: 4 },
  { name: "Kubernetes", icon: "☸️", cat: "devops", level: 3 },
  { name: "AWS", icon: "☁️", cat: "devops", level: 3 },
  { name: "Terraform", icon: "🏗️", cat: "devops", level: 2 },
  { name: "MongoDB", icon: "🍃", cat: "database", level: 5 },
  { name: "PostgreSQL", icon: "🐘", cat: "database", level: 4 },
  { name: "Redis", icon: "🔴", cat: "database", level: 4 },
];

const CATEGORIES = [
  { name: "All", value: "all" },
  { name: "Frontend", value: "frontend" },
  { name: "Backend", value: "backend" },
  { name: "AI / ML", value: "ai" },
  { name: "DevOps", value: "devops" },
  { name: "Databases", value: "database" },
];

const MARQUEE_ITEMS = [
  { icon: "🍃", name: "MongoDB" },
  { icon: "🚂", name: "Express.js" },
  { icon: "⚛️", name: "React" },
  { icon: "🟢", name: "Node.js" },
  { icon: "🦜", name: "LangChain" },
  { icon: "🤖", name: "OpenAI API" },
  { icon: "🐍", name: "Python" },
  { icon: "🐘", name: "PostgreSQL" },
  { icon: "🔴", name: "Redis" },
  { icon: "🐳", name: "Docker" },
  { icon: "☁️", name: "AWS" },
  { icon: "📐", name: "Vector DBs" },
  { icon: "🔗", name: "REST APIs" },
  { icon: "▲", name: "Next.js" },
  { icon: "🕸️", name: "GraphQL" },
  { icon: "🔷", name: "TypeScript" },
];

const MARQUEE_ITEMS2 = [
  { icon: "☸️", name: "Kubernetes" },
  { icon: "🏗️", name: "Terraform" },
  { icon: "📊", name: "Prometheus" },
  { icon: "🌀", name: "Tailwind CSS" },
  { icon: "⚡", name: "FastAPI" },
  { icon: "🔮", name: "RAG Systems" },
  { icon: "📡", name: "WebRTC" },
  { icon: "🗺️", name: "D3.js" },
  { icon: "🔒", name: "Web Crypto" },
  { icon: "🌿", name: "SvelteKit" },
  { icon: "📦", name: "Pinecone" },
  { icon: "🤖", name: "Transformers.js" },
  { icon: "💻", name: "WASM" },
  { icon: "🛒", name: "Stripe / Razorpay" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.cat === activeCategory);

  const renderLevelDots = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className={`skill-lvl-dot ${i < level ? "filled" : ""}`} />
    ));
  };

  return (
    <div id="skills" className="skills-section">
      <div className="section-header reveal">
        <div>
          <div className="section-eyebrow">05 — SKILLS</div>
          <h2 className="section-title">My Tech Stack</h2>
        </div>
        <div className="section-line"></div>
      </div>

      <div className="skills-categories reveal">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`skill-cat-btn ${activeCategory === cat.value ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="skills-grid-wrapper reveal">
        {filteredSkills.map((skill, idx) => (
          <div key={idx} className="skill-grid-item">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name-text">{skill.name}</div>
            <div className="skill-level-dots">
              {renderLevelDots(skill.level)}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-marquee-section reveal">
        <div className="skills-marquee-label">All technologies</div>
        <div className="skills-marquee-wrap">
          <div className="skills-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={idx} className="skill-item">
                <span>{item.icon}</span>
                {item.name}
                <span className="skill-dot"></span>
              </span>
            ))}
          </div>
        </div>
        <div className="skills-marquee-wrap">
          <div className="skills-marquee reverse">
            {[...MARQUEE_ITEMS2, ...MARQUEE_ITEMS2].map((item, idx) => (
              <span key={idx} className="skill-item">
                <span>{item.icon}</span>
                {item.name}
                <span className="skill-dot"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
