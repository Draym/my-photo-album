require('dotenv').config()

const fs = require('fs')
const path = require('path')

const manifest = {
  short_name: process.env.NEXT_PUBLIC_APP_SHORT_NAME,
  name: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  start_url: '/',
  background_color: '#FFFFFF',
  display: 'standalone',
  orientation: 'portrait-primary',
  theme_color: '#000000',
  icons: [
    {
      src: '/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
}

fs.writeFileSync(
  path.join(__dirname, '../public/manifest.json'),
  JSON.stringify(manifest)
)
