import type { CollectionConfig } from 'payload';
import { sendEnrollmentEmail } from '../hooks/sendEnrollmentEmail';

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: 'Enrollment',
    plural: 'Enrollments',
  },
  admin: {
    defaultColumns: ['student', 'course', 'paymentStatus', 'amount', 'enrolledAt', 'status'],
    description: 'Track student enrollments and payment status.',
  },
  hooks: {
    afterChange: [sendEnrollmentEmail],
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
      name: 'paymentId',
      type: 'text',
      label: 'Payment ID',
      admin: {
        description: 'Payment gateway transaction ID (e.g. Razorpay).',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      label: 'Payment Status',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Amount (₹)',
      min: 0,
    },
    {
      name: 'enrolledAt',
      type: 'date',
      label: 'Enrolled At',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
