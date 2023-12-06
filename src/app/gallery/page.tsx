'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'

export default function Gallery() {
  const { medias, refreshMedias } = useMedias({type: MediaType.IMAGE})
  return (
    <div>
      Hello World
    </div>
  )
}
