'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import Gallery from 'react-photo-gallery'
import React, { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import { Lightbox } from 'react-modal-image'
import './GalleryView.css'

interface Photo {
  src: string
  width: number
  height: number
  sizes?: string[]
}

function requireColumns(width: number) {
  return width > 768
}

interface GalleryViewProps {
  active: boolean
}

const GalleryView: React.FC<GalleryViewProps> = () => {
  const [useColumns, setUseColumns] = useState(false)
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      type: MediaType.IMAGE,
      pageMaxSize: 25
    })
  const [consumedPages, setConsumedPages] = useState<string[]>([])
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event: any, attr: any) => {
    const { index } = attr
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const photos: Photo[] =
    medias?.map((media) => {
      const ratio = media.width && media.height ? media.width / media.height : 1
      return {
        src: media.thumbnailLarge,
        width: ratio,
        height: 1
      }
    }) || []
  //console.log(medias, nextPageToken)

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (nextPageToken && consumedPages.includes(nextPageToken)) {
        return
      }
      await nextPage(loading, nextPageToken)
      if (nextPageToken) {
        setConsumedPages([...consumedPages, nextPageToken])
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, nextPageToken, consumedPages])

  const handleWindowSizeChange = () => {
    setUseColumns(requireColumns(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div>
      {photos.length > 0 && (
        <Gallery
          photos={photos}
          direction={useColumns ? 'column' : undefined}
          onClick={openLightbox}
        />
      )}
      {medias.length != 0 && viewerIsOpen && (
        <Lightbox
          small={medias[currentImage].thumbnailMedium}
          medium={medias[currentImage].url}
          large={medias[currentImage].url}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
export default GalleryView
