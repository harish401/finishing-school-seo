import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Unique Mentors Finishing School',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Empowering Futures Through Skill Development',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Number',
      admin: {
        description: 'Include country code, e.g. "+91 09544774599"',
      },
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'googleMapsEmbed',
      type: 'textarea',
      label: 'Google Maps Embed Code',
      admin: {
        description: 'Paste the full <iframe> embed code from Google Maps.',
      },
    },
    {
      type: 'group',
      name: 'socialLinks',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
      ],
    },
  ],
};
