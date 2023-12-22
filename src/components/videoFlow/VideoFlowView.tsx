'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import './VideoFlowView.css'
import React, { useEffect, useRef, useState } from 'react'

interface VideoFlowViewProps {
  active: boolean
}

const swipeThreshold = 30 // Minimum distance for a swipe action
const tapDurationThreshold = 200 // Maximum time (in ms) for a tap

const VideoFlowView: React.FC<VideoFlowViewProps> = ({ active }) => {
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      //folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ',
      type: MediaType.VIDEO,
      pageMaxSize: 4
    })
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartTimestamp = useRef(0)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const videoElements = useRef<HTMLVideoElement[]>([])

  // Preload videos and store as video elements in an array
  const preloadVideos = () => {
    const videoToPreload = medias.slice(videoElements.current.length)
    videoToPreload.forEach((media) => {
      const video = document.createElement('video')
      video.src = media.src
      video.className = 'video-player'
      video.preload = 'auto'
      video.controls = true
      video.loop = true
      video.playsInline = true
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
    touchStartTimestamp.current = event.timeStamp
  }

  const handleTouchMove = (event: TouchEvent) => {
    touchEndY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartY.current === 0 || touchEndY.current === 0) {
      return
    }
    const touchDuration = new Date().getTime() - touchStartTimestamp.current
    const yDiff = touchEndY.current - touchStartY.current

    if (
      Math.abs(yDiff) > swipeThreshold &&
      touchDuration > tapDurationThreshold
    ) {
      touchStartY.current = 0
      touchEndY.current = 0
      // Handle swipe
      if (yDiff > 0) {
        handleScroll(currentIndex - 1)
      } else {
        handleScroll(currentIndex + 1)
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true })
      container.addEventListener('touchstart', handleTouchStart, {
        passive: true
      })
      container.addEventListener('touchmove', handleTouchMove, {
        passive: true
      })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentIndex, medias])

  return <div ref={containerRef} className="video-container" />
}

export default VideoFlowView
