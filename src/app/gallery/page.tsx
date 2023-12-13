'use client'

import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'

export default function Gallery() {
  const { medias, refreshMedias } = useMedias({ folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ', type: MediaType.IMAGE })
  console.log('medias: ', medias)
  return <div>Hello World</div>
}
