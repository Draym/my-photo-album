'use client'

import React, { useRef, useEffect } from 'react'
import './VideoCard.css'

export interface VideoCardProps {
  url: string
  width?: number
  height?: number
  autoplay: boolean
  setVideoRef: (ref: any) => void
}

export default function VideoCard(props: VideoCardProps) {
  const {
    url,
    width,
    height,
    autoplay,
    setVideoRef
  } = props
  const videoRef: any | null = useRef(null)

  useEffect(() => {
    if (autoplay && videoRef) {
      videoRef.current.play()
    }
  }, [autoplay])

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        width={width}
        height={height}
        ref={(ref) => {
          videoRef.current = ref
          setVideoRef(ref)
        }}
        loop
        src={url}
        muted={true}
      ></video>
    </div>
  )
}
