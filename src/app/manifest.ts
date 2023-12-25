import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_SHORT_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    start_url: '/',
    background_color: '#FFFFFF',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#00172f',
    icons: [
      {
        //src: process.env.NEXT_PUBLIC_APP_ICON_192!,
        src: '/icon_192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        //src: process.env.NEXT_PUBLIC_APP_ICON_192!,
        src: '/icon_521x521.png',
        sizes: '521x521',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  }
}
