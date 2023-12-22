'use client'

import React, { useRef, useEffect, useState } from 'react'
import './VideoCard.css'

export interface VideoCardProps {
  url: string
  width?: number
  height?: number
  setVideoRef: (ref: any) => void
  autoplay?: boolean
  controls?: boolean
}

export default function VideoCard(props: VideoCardProps) {
  const {
    url,
    autoplay,
    setVideoRef,
    controls
  } = props
  const videoRef: any | null = useRef(null)
  const [width, setWidth] = useState(props.width && props.width > window.innerWidth ? window.innerWidth : props.width)
  const [height, setHeight] = useState(props.height && props.height > window.innerHeight ? window.innerHeight : props.height)

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
        className="video-player"
        onClick={onVideoPress}
        width={width}
        height={height}
        ref={(ref) => {
          videoRef.current = ref
          setVideoRef(ref)
        }}
        loop
        autoPlay={autoplay}
        controls={controls}
        src={url}
      ></video>
    </div>
  )
}
