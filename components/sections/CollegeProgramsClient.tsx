import { HeroSection } from "@/components/ui/hero-section-4";
import { getFinishingProgramCategory } from "@/lib/finishing-school-programs";
import { ProgramLanding } from "@/components/sections/ProgramLanding";

export function CollegeProgramsClient() {
  const category = getFinishingProgramCategory("colleges");

  return (
    <>
      <HeroSection
        eyebrow="College Programs"
        title="Campus-to-career readiness for graduates."
        subtitle={category.description}
        primaryButtonText={category.cta}
        primaryButtonHref="/contact"
        secondaryButtonText="Browse Courses"
        secondaryButtonHref="/courses"
        imageUrl={category.heroImage}
      />
      <ProgramLanding categoryKey="colleges" hideHero />
    </>
  );
}
