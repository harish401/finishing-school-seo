import { ProgramLanding } from "@/components/sections/ProgramLanding";
import { FloatingSchoolHero } from "@/components/ui/hero-section-7";
import { getFinishingProgramCategory } from "@/lib/finishing-school-programs";

export function SchoolProgramsClient() {
  const category = getFinishingProgramCategory("schools");
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
      alt: "Students collaborating around a study table",
      className:
        "hidden h-36 w-52 left-6 top-24 rotate-[-5deg] sm:block md:left-12 lg:left-20 lg:top-28 lg:h-44 lg:w-64",
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop",
      alt: "Teacher guiding students in a classroom",
      className:
        "hidden h-32 w-44 right-5 top-28 rotate-[5deg] sm:block md:right-12 lg:right-20 lg:top-24 lg:h-40 lg:w-56",
    },
    {
      src: category.heroImage,
      alt: category.heroAlt,
      className:
        "h-28 w-40 bottom-8 right-4 rotate-[-3deg] sm:h-32 sm:w-48 sm:bottom-12 sm:right-10 md:right-16 lg:bottom-16 lg:h-40 lg:w-60",
    },
    {
      src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=700&auto=format&fit=crop",
      alt: "Open books for school learning",
      className:
        "h-24 w-32 bottom-10 left-4 rotate-[4deg] sm:h-28 sm:w-40 sm:left-10 md:left-16 lg:bottom-20 lg:h-36 lg:w-52",
    },
  ];

  return (
    <>
      <FloatingSchoolHero
        eyebrow="School Programs"
        title="Future-ready skills for school students"
        description={category.description}
        primaryButtonText={category.cta}
        primaryButtonHref="/contact"
        secondaryButtonText="Browse Courses"
        secondaryButtonHref="/courses"
        features={category.highlights.slice(0, 3)}
        images={heroImages}
      />
      <ProgramLanding categoryKey="schools" hideHero />
    </>
  );
}
