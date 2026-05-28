import type { CollectionConfig } from 'payload';

export const Students: CollectionConfig = {
  slug: 'students',
  labels: {
    singular: 'Student',
    plural: 'Students',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'course', 'createdAt'],
    description: 'Manage registered students.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'college',
      type: 'text',
      label: 'College / Institution',
    },
    {
      name: 'course',
      type: 'select',
      label: 'Course Category',
      options: [
        { label: 'School', value: 'school' },
        { label: 'College', value: 'college' },
        { label: 'Professional', value: 'professional' },
      ],
    },
    {
      name: 'enrollments',
      type: 'relationship',
      relationTo: 'enrollments',
      hasMany: true,
      admin: {
        description: 'Courses this student is enrolled in.',
      },
    },
  ],
  timestamps: true,
};
