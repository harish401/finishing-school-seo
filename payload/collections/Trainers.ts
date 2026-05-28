import type { CollectionConfig } from 'payload';

export const Trainers: CollectionConfig = {
  slug: 'trainers',
  labels: {
    singular: 'Trainer',
    plural: 'Trainers',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'email', 'order'],
    description: 'Manage trainers and mentors.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title / Designation',
      admin: {
        description: 'e.g. "Senior Communication Trainer"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for the trainer profile page.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'Specialties',
      labels: {
        singular: 'Specialty',
        plural: 'Specialties',
      },
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
};
