import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Mason\'s Portfolio',
  subtitle: 'A collection of my graphic design and coding projects',
  lang: 'en',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 80,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: false,
    src: 'assets/images/banner.png',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center', // Equivalent to object-position, defaults center
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    {
      name: '☆',
      url: 'https://11ason.netlify.app/landing/',     // Internal links should not include the base path, as it is automatically added
      external: true,
    },
    LinkPreset.Archive,
        {
      name: 'Gallery',
      url: 'https://11ason.netlify.app/gallery',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
    {
      name: 'Photography',
      url: 'https://vsco.co/11ason/gallery',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
    {
      name: 'Now ▷',
      url: 'https://11ason.netlify.app/nowplaying/',     // Internal links should not include the base path, as it is automatically added
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.jpeg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Mason',
  bio: 'Student / Graphic Designer / Developer',
  links: [
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://twitter.com/11asonn',
    },
    
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/11ason',
    },

    {
      name: 'Instagram',
      icon: 'fa6-brands:instagram',
      url: 'https://instagram.com/11as0n',
    },

    {
      name: 'VSCO',
      icon: 'fa6-regular:circle',
      url: 'https://vsco.co/11ason/gallery',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: false,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
