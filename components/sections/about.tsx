import { Section } from "@/components/common/section";

export const About = () => {
  return (
    <Section id="about">
      <h1 className="text-4xl md:text-5xl font-bold">About Section</h1>
      <p className="mt-4 text-gray-300 max-w-xl text-center">
        This is the About section where you can describe yourself, your skills,
        and your experience.
      </p>
    </Section>
  );
};
