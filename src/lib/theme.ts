export const theme = {
  colors: {
    primary: '#08162D',
    secondary: '#D0A455',
    tertiary: '#FAF0BC',
    ink: '#000000',
    white: '#FFFFFF',
    muted: '#475569',
    border: '#E5E7EB',
  },
  fonts: {
    heading: 'var(--font-open-sans)',
    body: 'var(--font-roboto)',
  },
  lineHeight: 1.25,
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    pill: '999px',
  },
} as const;

export const business = {
  name: 'Rocasa Conveyancing',
  tagline: 'Licensed Conveyancer · JP (NSW) · Sydney',
  phone: '+61 404 674 706',
  phoneHref: 'tel:+61404674706',
  email: 'khem@rocasaconveyancing.com.au',
  emailHref: 'mailto:khem@rocasaconveyancing.com.au',
  website: 'www.rocasaconveyancing.com.au',
  address: {
    line1: 'Level 4, Suite 401 / 276',
    line2: 'Pitt St, Sydney NSW 2000',
  },
  hours: 'Mon – Fri · 9:00am – 5:30pm AEST',
} as const;

export type Theme = typeof theme;
