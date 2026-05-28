import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import { Media } from './collections/Media';
import { Courses } from './collections/Courses';
import { BlogPosts } from './collections/BlogPosts';
import { Gallery } from './collections/Gallery';
import { Testimonials } from './collections/Testimonials';
import { Trainers } from './collections/Trainers';
import { Programs } from './collections/Programs';
import { Students } from './collections/Students';
import { Enrollments } from './collections/Enrollments';
import { Certificates } from './collections/Certificates';
import { LegalDocuments } from './collections/LegalDocuments';

// Globals
import { SiteSettings } from './globals/SiteSettings';
import { HomePage } from './globals/HomePage';
import { Navigation } from './globals/Navigation';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '— Unique Mentors Admin',
      title: 'Unique Mentors Admin',
    },
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  collections: [
    Media,
    Courses,
    BlogPosts,
    Gallery,
    Testimonials,
    Trainers,
    Programs,
    Students,
    Enrollments,
    Certificates,
    LegalDocuments,
  ],
  globals: [
    SiteSettings,
    HomePage,
    Navigation,
  ],
});
