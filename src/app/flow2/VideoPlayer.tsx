'use client'

import React, { useState, useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoUrls: string[]
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const videoElements = useRef<HTMLVideoElement[]>([])

  // Preload videos and store as video elements in an array
  const preloadVideos = () => {
    videoUrls.forEach((url) => {
      const video = document.createElement('video')
      video.src = url
      video.preload = 'auto'
      video.controls = true
      video.loop = true
      videoElements.current.push(video)
    })
  }

  useEffect(() => {
    preloadVideos()
  }, [videoUrls])

  const handleScroll = (nextIndex: number) => {
    if (nextIndex >= 0 && nextIndex < videoUrls.length) {
      videoElements.current[currentIndex].pause()
      videoElements.current[currentIndex].currentTime = 0
      setCurrentIndex(nextIndex)
    }
  }

  const handleWheel = (event: WheelEvent) => {
    const nextIndex = event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1
    handleScroll(nextIndex)
  }

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: TouchEvent) => {
    const touchEndY = event.changedTouches[0].clientY
    const nextIndex =
      touchEndY < touchStartY.current ? currentIndex + 1 : currentIndex - 1
    handleScroll(nextIndex)
  }

  useEffect(() => {
    const container = containerRef.current
    const currentVideo = videoElements.current[currentIndex]
    if (container && currentVideo) {
      container.innerHTML = '' // Clear existing content
      container.appendChild(currentVideo) // Append the new video
      currentVideo.play()
    }
  }, [currentIndex, videoElements])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel)
      container.addEventListener('touchstart', handleTouchStart)
      container.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentIndex])

  return <div ref={containerRef} className="video-container" />
}

export default VideoPlayer
