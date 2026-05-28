import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'targetAudience', 'status'],
    description: 'Manage programs for school and college students.',
  },
  access: {
    read: () => true,
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
    },
    {
      name: 'targetAudience',
      type: 'select',
      required: true,
      label: 'Target Audience',
      options: [
        { label: 'School Students', value: 'school' },
        { label: 'College Students', value: 'college' },
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
      name: 'highlights',
      type: 'array',
      label: 'Program Highlights',
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
  ],
};
