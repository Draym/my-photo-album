'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import Gallery from 'react-photo-gallery'
import { useCallback, useEffect, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import './page.css'

interface Photo {
  src: string
  width: number
  height: number
  sizes?: string[]
}

export default function GalleryPage() {
  const useColumns = false
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

  return (
    <div>
      {photos.length > 0 && (
        <Gallery
          photos={photos}
          direction={useColumns ? 'column' : undefined}
          onClick={openLightbox}
        />
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                source: x.src
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  )
}
