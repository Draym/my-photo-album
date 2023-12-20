'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import Gallery from 'react-photo-gallery'
import { useEffect } from 'react'

interface Photo {
  src: string
  width: number
  height: number
}

export default function GalleryPage() {
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      type: MediaType.IMAGE,
      pageMaxSize: 25
    })
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

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      nextPage(loading, nextPageToken)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, nextPageToken])

  return <div>{photos.length > 0 && <Gallery photos={photos} />}</div>
}
