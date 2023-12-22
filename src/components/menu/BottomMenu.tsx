'use client'

import React, { useState } from 'react'
import './BottomMenu.css'

interface BottomMenuProps {
  onScreenChange: (screen: 'video' | 'gallery') => void
}

const BottomMenu: React.FC<BottomMenuProps> = ({ onScreenChange }) => {
  const [activeScreen, setActiveScreen] = useState<'video' | 'gallery'>('video')

  const handleScreenChange = (screen: 'video' | 'gallery') => {
    setActiveScreen(screen)
    onScreenChange(screen)
  }

  return (
    <div className="bottom-menu">
      <button
        className={`menu-button ${activeScreen === 'video' ? 'active' : ''}`}
        onClick={() => handleScreenChange('video')}
      >
        TikTok Videos
      </button>
      <button
        className={`menu-button ${activeScreen === 'gallery' ? 'active' : ''}`}
        onClick={() => handleScreenChange('gallery')}
      >
        Photo Gallery
      </button>
    </div>
  )
}

export default BottomMenu
