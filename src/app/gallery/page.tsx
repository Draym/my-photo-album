'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'
import Gallery from 'react-photo-gallery'

export default function GalleryPage() {
  const { medias, refreshMedias } = useMedias({
    folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ',
    type: MediaType.IMAGE
  })
  const photos =
    medias?.map((media) => {
      const ratio = media.width / media.height
      return {
        src: media.url,
        width: ratio,
        height: 1
      }
    }) || []
  return (
    <div>
      <Gallery
        photos={photos}
      />
    </div>
  )
}
