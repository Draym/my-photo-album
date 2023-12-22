'use client'

import React, { useState, useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoUrls: string[]
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({videoUrls}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload videos and store as video elements in an array
  const preloadVideos = () => {
    const videos = videoUrls.map((url) => {
      const video = document.createElement('video')
      video.src = url
      video.preload = 'auto'
      video.controls = true
      video.loop = true
      video.style.width = 'auto'
      video.style.height = '780px'
      return video
    })

    // Append the first video to the container
    if (containerRef.current && videos.length > 0) {
      containerRef.current.appendChild(videos[0])
    }

    return videos
  }

  // Store the preloaded video elements
  const videoElements = useRef<HTMLVideoElement[]>(preloadVideos())

  const handleScroll = (event: WheelEvent) => {
    const nextIndex = event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1
    if (nextIndex >= 0 && nextIndex < videoUrls.length) {
      videoElements.current[currentIndex].pause()
      videoElements.current[currentIndex].currentTime = 0
      setCurrentIndex(nextIndex)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const currentVideo = videoElements.current[currentIndex]
    if (container && currentVideo) {
      console.log(container)
      container.innerHTML = '' // Clear existing content
      container.appendChild(currentVideo) // Append the new video
      currentVideo.play()
    }
  }, [currentIndex, videoElements])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
      }
    }
  }, [videoUrls, currentIndex])

  return <div ref={containerRef} className="video-container" />
}

export default VideoPlayer
