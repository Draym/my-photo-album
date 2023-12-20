'use client'

import React, { useEffect, useRef } from 'react'
import './page.css'
import VideoCard from '@/components/VideoCard'
import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'

interface Video {
  url: string
  width: number
  height: number
}

export default function VideoGallery() {
  const videoRefs = useRef<any[]>([])
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ',
      type: MediaType.VIDEO,
      pageMaxSize: 25
    })
  const videos: Video[] =
    medias?.map((media) => ({
      url: media.url,
      width: media.width,
      height: media.height
    })) || []

  console.log(videos)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8 // Adjust this value to change the scroll trigger point
    }
    // This function handles the intersection of videos
    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target
          videoElement.play()
        } else {
          const videoElement = entry.target
          videoElement.pause()
          videoElement.load()
        }
      })
    }
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )
    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef)
    })
    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [videos])

  // This function handles the reference of each video
  const handleVideoRef = (index: number) => (ref: any) => {
    videoRefs.current[index] = ref
  }

  return (
    <div className="video-container">
      <div className="video-placeholder">
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            url={video.url}
            width={video.width}
            height={video.height}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
