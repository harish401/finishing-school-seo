import { buildCourseSchema } from '@/lib/structured-data';
import { JsonLd } from './JsonLd';

interface CourseJsonLdProps {
  course: {
    title: string;
    description: string;
    slug: string;
    fee: number;
    mode: string;
    duration: string;
  };
}

export function CourseJsonLd({ course }: CourseJsonLdProps) {
  return <JsonLd data={buildCourseSchema(course)} />;
}
