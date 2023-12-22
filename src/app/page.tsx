'use client'

import React, { useState } from 'react';
import VideoFlowView from '@/components/videoFlow/VideoFlowView'
import GalleryView from '@/components/gallery/GalleryView'
import BottomMenu from '@/components/menu/BottomMenu'

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'video' | 'gallery'>('video');

  return (
    <div>
      <div style={{ display: currentScreen === 'video' ? 'block' : 'none' }}>
        <VideoFlowView/>
      </div>
      <div style={{ display: currentScreen === 'gallery' ? 'block' : 'none' }}>
        <GalleryView />
      </div>
      <BottomMenu onScreenChange={setCurrentScreen} />
    </div>
  );
};

export default App;