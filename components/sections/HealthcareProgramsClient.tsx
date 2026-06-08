import { HealthcareParallaxStory } from "@/components/sections/HealthcareParallaxStory";
import { ProgramLanding } from "@/components/sections/ProgramLanding";

export function HealthcareProgramsClient() {
  return (
    <>
      <HealthcareParallaxStory />
      <ProgramLanding categoryKey="healthcare" hideHero />
    </>
  );
}
