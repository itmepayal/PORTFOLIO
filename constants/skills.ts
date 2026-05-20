import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
  FaDocker,
  FaJava,
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
  SiVercel,
  SiRailway,
  SiRender,
  SiSwagger,
  SiOpenapiinitiative,
  SiPython,
  SiRedis,
  SiSocketdotio,
  SiPrisma,
  SiMysql,
  SiFirebase,
  SiRedux,
  SiGraphql,
  SiNestjs,
  SiNginx,
  SiLinux,
  SiGithubactions,
  SiCloudinary,
  SiJsonwebtokens,
  SiJest,
  SiPostman,
  SiFigma,
  SiMui,
  SiFramer,
  SiAxios,
} from "react-icons/si";

import { HiServer, HiCode, HiOutlineChip } from "react-icons/hi";

export const SKILLS = [
  /* -------------------------------------------------------------------------- */
  /* PROGRAMMING LANGUAGES */
  /* -------------------------------------------------------------------------- */

  {
    title: "Programming Languages",
    icon: HiCode,
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

      {
        name: "Java",
        icon: FaJava,
        link: "https://docs.oracle.com/javase/tutorial/",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* BACKEND DEVELOPMENT */
  /* -------------------------------------------------------------------------- */

  {
    title: "Backend Development",
    icon: HiServer,
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
        name: "NestJS",
        icon: SiNestjs,
        link: "https://docs.nestjs.com/",
      },

      {
        name: "Django",
        icon: SiDjango,
        link: "https://docs.djangoproject.com/",
      },

      {
        name: "FastAPI",
        icon: SiFastapi,
        link: "https://fastapi.tiangolo.com/",
      },

      {
        name: "REST API",
        icon: SiOpenapiinitiative,
        link: "https://restfulapi.net/",
      },

      {
        name: "GraphQL",
        icon: SiGraphql,
        link: "https://graphql.org/learn/",
      },

      {
        name: "Socket.IO",
        icon: SiSocketdotio,
        link: "https://socket.io/docs/v4/",
      },

      {
        name: "JWT Authentication",
        icon: SiJsonwebtokens,
        link: "https://jwt.io/introduction",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* FRONTEND DEVELOPMENT */
  /* -------------------------------------------------------------------------- */

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
        name: "Redux",
        icon: SiRedux,
        link: "https://redux.js.org/",
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

      {
        name: "Material UI",
        icon: SiMui,
        link: "https://mui.com/",
      },

      {
        name: "Framer Motion",
        icon: SiFramer,
        link: "https://www.framer.com/motion/",
      },

      {
        name: "Axios",
        icon: SiAxios,
        link: "https://axios-http.com/docs/intro",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* DATABASES */
  /* -------------------------------------------------------------------------- */

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

      {
        name: "MySQL",
        icon: SiMysql,
        link: "https://dev.mysql.com/doc/",
      },

      {
        name: "Redis",
        icon: SiRedis,
        link: "https://redis.io/docs/",
      },

      {
        name: "Firebase",
        icon: SiFirebase,
        link: "https://firebase.google.com/docs",
      },

      {
        name: "Prisma ORM",
        icon: SiPrisma,
        link: "https://www.prisma.io/docs",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* DEVOPS & TOOLS */
  /* -------------------------------------------------------------------------- */

  {
    title: "DevOps & Tools",
    icon: FaDocker,
    items: [
      {
        name: "Docker",
        icon: FaDocker,
        link: "https://docs.docker.com/",
      },

      {
        name: "Git",
        icon: FaGitAlt,
        link: "https://git-scm.com/docs",
      },

      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        link: "https://docs.github.com/en/actions",
      },

      {
        name: "Linux",
        icon: SiLinux,
        link: "https://linuxjourney.com/",
      },

      {
        name: "Nginx",
        icon: SiNginx,
        link: "https://nginx.org/en/docs/",
      },

      {
        name: "AWS",
        icon: SiNginx,
        link: "https://docs.aws.amazon.com/",
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

      {
        name: "Cloudinary",
        icon: SiCloudinary,
        link: "https://cloudinary.com/documentation",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* API & TESTING */
  /* -------------------------------------------------------------------------- */

  {
    title: "API & Testing",
    icon: HiOutlineChip,
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

      {
        name: "Postman",
        icon: SiPostman,
        link: "https://learning.postman.com/",
      },

      {
        name: "Jest",
        icon: SiJest,
        link: "https://jestjs.io/docs/getting-started",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* SYSTEM DESIGN & CORE CS */
  /* -------------------------------------------------------------------------- */

  {
    title: "System Design & CS Fundamentals",
    icon: HiOutlineChip,
    items: [
      {
        name: "System Design",
        icon: HiServer,
        link: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers",
      },

      {
        name: "Microservices",
        icon: HiOutlineChip,
        link: "https://microservices.io/",
      },

      {
        name: "Scalable APIs",
        icon: HiCode,
        link: "https://restfulapi.net/",
      },

      {
        name: "Data Structures & Algorithms",
        icon: SiCplusplus,
        link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /* DESIGN & PRODUCTIVITY */
  /* -------------------------------------------------------------------------- */

  {
    title: "Design & Productivity",
    icon: SiFigma,
    items: [
      {
        name: "Figma",
        icon: SiFigma,
        link: "https://help.figma.com/",
      },
    ],
  },
];
