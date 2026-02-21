import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'navigation',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal route (e.g. /sessions) or external URL.',
          },
        },
      ],
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'About Me', href: '/about' },
        { label: 'Sessions', href: '/sessions' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Blog', href: '/blogs' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          defaultValue: 'Christos Medicine',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'A sacred space for embodied love, wisdom, and presence.',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'This is an online sanctuary for those seeking wholeness, remembrance, and gentle inner alignment.',
        },
        {
          name: 'learnMoreLabel',
          type: 'text',
          defaultValue: 'Learn More',
        },
        {
          name: 'learnMoreHref',
          type: 'text',
          defaultValue: '/about',
        },
        {
          name: 'sessionCtaLabel',
          type: 'text',
          defaultValue: 'Pay for Healing Session',
        },
        {
          name: 'sessionCtaUrl',
          type: 'text',
          admin: {
            description:
              'Optional override URL for the session payment CTA. If empty, env fallback is used.',
          },
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'What Christos Medicine Is',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Christos Medicine is a grounded, heart-led practice that invites you into an anointed consciousness. It is not a doctrine or hierarchy. It is a sacred place for remembering what is already whole within you.',
        },
      ],
    },
    {
      name: 'elements',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'trait',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          name: 'Earth',
          trait: 'Foundation',
          description: 'The stability and support that roots you in safety, belonging, and the physical body.',
        },
        {
          name: 'Fire',
          trait: 'Transformation',
          description:
            'The life force and passion that illuminates your direction and transforms stagnation into inspiration.',
        },
        {
          name: 'Water',
          trait: 'Flow',
          description:
            'The intuitive movement that allows emotions to cleanse and reshape your experience without force.',
        },
        {
          name: 'Air',
          trait: 'Clarity',
          description: 'The breath and perspective that creates space for understanding and clear awareness.',
        },
        {
          name: 'Ether',
          trait: 'Space',
          description: 'The silence and unity that connects you to the vastness of consciousness itself.',
        },
      ],
    },
    {
      name: 'unionSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'The Embodied Union',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'The Embodied Union is the sacred marriage of Wisdom and Love in your physical vessel, where spirit and matter breathe as one integrated life.',
        },
      ],
    },
    {
      name: 'support',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Support This Sacred Work',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Your contribution helps maintain this healing space and allows transformative sessions to remain accessible.',
        },
        {
          name: 'donationLabel',
          type: 'text',
          defaultValue: 'Make Donation',
        },
        {
          name: 'donationUrl',
          type: 'text',
          admin: {
            description:
              'Optional override URL for donation CTA. If empty, env fallback is used.',
          },
        },
        {
          name: 'socialLinksText',
          type: 'text',
          defaultValue: 'YouTube | Instagram | Email',
        },
        {
          name: 'supportImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
  ],
}
