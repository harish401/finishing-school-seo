import type { CollectionConfig } from 'payload';

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'Certificate',
    plural: 'Certificates',
  },
  admin: {
    useAsTitle: 'certificateNumber',
    defaultColumns: ['certificateNumber', 'student', 'course', 'issuedAt'],
    description: 'Manage issued certificates.',
  },
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'certificateNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Certificate Number',
    },
    {
      name: 'issuedAt',
      type: 'date',
      label: 'Issued At',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'pdfUrl',
      type: 'text',
      label: 'PDF URL',
      admin: {
        description: 'URL to the generated certificate PDF.',
      },
    },
  ],
};
