'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import './VideoFlowView.css'
import React, { useEffect, useRef, useState } from 'react'

interface VideoFlowViewProps {
  active: boolean
}

const VideoFlowView: React.FC<VideoFlowViewProps> = ({ active }) => {
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      //folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ',
      type: MediaType.VIDEO,
      pageMaxSize: 4
    })
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const videoElements = useRef<HTMLVideoElement[]>([])

  // Preload videos and store as video elements in an array
  const preloadVideos = () => {
    const videoToPreload = medias.slice(videoElements.current.length)
    videoToPreload.forEach((media) => {
      const video = document.createElement('video')
      video.src = media.url
      video.className = 'video-player'
      video.preload = 'auto'
      video.controls = true
      video.loop = true
      videoElements.current.push(video)
    })
    displayCurrentVideo()
  }

  useEffect(() => {
    const currentVideo = videoElements.current[currentIndex]
    if (!currentVideo) {
      return
    }
    if (active) {
      currentVideo.play()
    } else {
      currentVideo.pause()
    }
  }, [active])

  useEffect(() => {
    preloadVideos()
  }, [medias])

  useEffect(() => {
    displayCurrentVideo()
  }, [currentIndex])

  const displayCurrentVideo = () => {
    const container = containerRef.current
    const currentVideo = videoElements.current[currentIndex]
    if (container && currentVideo) {
      container.innerHTML = '' // Clear existing content
      container.appendChild(currentVideo) // Append the new video
      currentVideo.play()
    }
  }

  const handleScroll = (nextIndex: number) => {
    if (nextIndex >= 0 && nextIndex < medias.length) {
      videoElements.current[currentIndex].pause()
      videoElements.current[currentIndex].currentTime = 0
      setCurrentIndex(nextIndex)
    }
    if (nextIndex === medias.length - 1) {
      nextPage(loading, nextPageToken)
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
  }, [currentIndex, medias])

  return <div ref={containerRef} className="video-container" />
}

export default VideoFlowView
