import type { GlobalConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          label: 'Subtitle',
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'heroCTAText',
          type: 'text',
          label: 'CTA Button Text',
          defaultValue: 'Explore Courses',
        },
        {
          name: 'heroCTALink',
          type: 'text',
          label: 'CTA Button Link',
          defaultValue: '/courses',
        },
      ],
    },
    {
      type: 'group',
      name: 'about',
      label: 'About Section',
      fields: [
        {
          name: 'aboutTitle',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'aboutDescription',
          type: 'richText',
          label: 'Description',
          editor: lexicalEditor({}),
        },
      ],
    },
  ],
};
