import {
  Contact,
  Experience,
  Footer,
  GithubPanel,
  Home,
  Projects,
  Skills,
} from "@/components/sections";

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Home />
      <Projects />
      <Experience />
      <GithubPanel />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
