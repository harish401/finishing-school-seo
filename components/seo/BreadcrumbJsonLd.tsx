import { buildBreadcrumbSchema } from '@/lib/structured-data';
import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return <JsonLd data={buildBreadcrumbSchema(items)} />;
}
