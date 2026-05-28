import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const LegalDocuments: CollectionConfig = {
  slug: 'legal-documents',
  labels: {
    singular: 'Legal Document',
    plural: 'Legal Documents',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'lastUpdated'],
    description: 'Manage terms, privacy policy, and cookie policy.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Terms & Conditions', value: 'terms' },
        { label: 'Privacy Policy', value: 'privacy' },
        { label: 'Cookie Policy', value: 'cookies' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
  ],
};
