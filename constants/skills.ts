import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiTailwindcss,
  SiBootstrap,
  SiNextdotjs,
  SiDocker,
  SiVercel,
  SiRailway,
  SiRender,
  SiSwagger,
  SiOpenapiinitiative,
  SiPython,
} from "react-icons/si";

export const SKILLS = [
  {
    title: "Programming Languages",
    icon: SiJavascript,
    items: [
      {
        name: "Python",
        icon: SiPython,
        link: "https://docs.python.org/3/",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        link: "https://www.typescriptlang.org/docs/",
      },
      {
        name: "C++",
        icon: SiCplusplus,
        link: "https://en.cppreference.com/w/",
      },
    ],
  },

  {
    title: "Backend Development",
    icon: FaNodeJs,
    items: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        link: "https://nodejs.org/en/docs",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        link: "https://expressjs.com/",
      },
      {
        name: "Django",
        icon: SiDjango,
        link: "https://docs.djangoproject.com/",
      },
      {
        name: "REST API",
        icon: SiOpenapiinitiative,
        link: "https://restfulapi.net/",
      },
      {
        name: "FastAPI",
        icon: SiFastapi,
        link: "https://fastapi.tiangolo.com/",
      },
    ],
  },

  {
    title: "Frontend Development",
    icon: FaReact,
    items: [
      {
        name: "HTML",
        icon: FaHtml5,
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        name: "CSS",
        icon: FaCss3Alt,
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        name: "React.js",
        icon: FaReact,
        link: "https://react.dev/",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        link: "https://nextjs.org/docs",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        link: "https://tailwindcss.com/docs",
      },
      {
        name: "Bootstrap",
        icon: SiBootstrap,
        link: "https://getbootstrap.com/docs/",
      },
    ],
  },

  {
    title: "Databases",
    icon: FaDatabase,
    items: [
      {
        name: "SQL",
        icon: FaDatabase,
        link: "https://www.w3schools.com/sql/",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        link: "https://www.mongodb.com/docs/",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        link: "https://www.postgresql.org/docs/",
      },
    ],
  },

  {
    title: "DevOps & Tools",
    icon: SiDocker,
    items: [
      {
        name: "Docker",
        icon: SiDocker,
        link: "https://docs.docker.com/",
      },
      {
        name: "Git",
        icon: FaGitAlt,
        link: "https://git-scm.com/docs",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        link: "https://vercel.com/docs",
      },
      {
        name: "Railway",
        icon: SiRailway,
        link: "https://docs.railway.app/",
      },
      {
        name: "Render",
        icon: SiRender,
        link: "https://render.com/docs",
      },
    ],
  },

  {
    title: "API Documentation",
    icon: SiSwagger,
    items: [
      {
        name: "Swagger",
        icon: SiSwagger,
        link: "https://swagger.io/docs/",
      },
      {
        name: "OpenAPI",
        icon: SiOpenapiinitiative,
        link: "https://spec.openapis.org/oas/latest.html",
      },
    ],
  },
];
