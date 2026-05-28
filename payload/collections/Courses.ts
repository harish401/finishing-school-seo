import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { revalidateOnChange } from '../hooks/revalidateOnChange';

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Course',
    plural: 'Courses',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'fee', 'mode', 'status', 'featured'],
    description: 'Manage all courses offered by Unique Mentors.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOnChange('/courses')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "personality-development"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'School', value: 'school' },
        { label: 'College', value: 'college' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Professional', value: 'professional' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'longDescription',
      type: 'richText',
      label: 'Long Description',
      editor: lexicalEditor({}),
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fee',
      type: 'number',
      label: 'Course Fee (₹)',
      min: 0,
    },
    {
      name: 'originalFee',
      type: 'number',
      label: 'Original Fee (₹)',
      min: 0,
      admin: {
        description: 'Shown as strikethrough price when discounted.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
      admin: {
        description: 'e.g. "3 months", "45 hours"',
      },
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'trainers',
    },
    {
      name: 'learningOutcomes',
      type: 'array',
      label: 'Learning Outcomes',
      labels: {
        singular: 'Outcome',
        plural: 'Outcomes',
      },
      fields: [
        {
          name: 'outcome',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Course Highlights',
      labels: {
        singular: 'Highlight',
        plural: 'Highlights',
      },
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      labels: {
        singular: 'FAQ',
        plural: 'FAQs',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // SEO fields — sidebar
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO Description',
      admin: {
        position: 'sidebar',
      },
    },
    // Status fields — sidebar
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this course on the homepage.',
      },
    },
  ],
};
