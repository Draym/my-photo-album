'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import Gallery from 'react-photo-gallery'
import { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import { Lightbox } from 'react-modal-image'
import './page.css'

interface Photo {
  src: string
  width: number
  height: number
  sizes?: string[]
}

function requireColumns(width: number) {
  return width > 768
}

export default function GalleryPage() {
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
        src: media.url,
        width: ratio,
        height: 1
      }
    }) || []
  console.log(medias, nextPageToken)

  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (nextPageToken && consumedPages.includes(nextPageToken)) {
        console.log('already consumed')
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
      {photos.length != 0 && viewerIsOpen && (
        <Lightbox
          small={photos[currentImage].src}
          medium={photos[currentImage].src}
          large={photos[currentImage].src}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
