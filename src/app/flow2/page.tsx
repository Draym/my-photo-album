'use client'

import VideoPlayer from './VideoPlayer'
import useMedias from '@/hooks/useMedias'
import { MediaType } from '@/models/media/mediaTypes'

const App = () => {
  const { medias, nextPageToken, loading, nextPage, refreshFromZero } =
    useMedias({
      //folder: '1qFq7Odqk5MZHGVDhBh8QzlGuRkU8poHJ',
      type: MediaType.VIDEO,
      pageMaxSize: 4
    })
  const videoUrls: string[] = medias?.map((media) => media.url) || []
  if (videoUrls.length === 0) {
    return <div>loading</div>
  }
  return <VideoPlayer videoUrls={videoUrls} />
}

export default App
