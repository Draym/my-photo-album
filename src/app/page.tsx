'use client'

import React, { useEffect, useState } from 'react'
import VideoFlowView from '@/components/videoFlow/VideoFlowView'
import GalleryView from '@/components/gallery/GalleryView'
import BottomMenu from '@/components/menu/BottomMenu'
import Head from 'next/head'

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'video' | 'gallery'>(
    'video'
  )

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          )
        })
        .catch((err) => {
          console.log('Service Worker registration failed:', err)
        })
    }
  }, [])

  return (
    <div>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_APP_SHORT_NAME} />
      </Head>
      <div style={{ display: currentScreen === 'video' ? 'block' : 'none' }}>
        <VideoFlowView active={currentScreen === 'video'} />
      </div>
      <div style={{ display: currentScreen === 'gallery' ? 'block' : 'none' }}>
        <GalleryView active={currentScreen === 'gallery'} />
      </div>
      <BottomMenu onScreenChange={setCurrentScreen} />
    </div>
  )
}

export default App
