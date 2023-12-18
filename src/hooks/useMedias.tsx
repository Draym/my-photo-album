import axios from 'axios'
import { useEffect, useState } from 'react'
import { Media, MediaFilters } from '@/models/media/mediaTypes'
import { stringifyQueryParams } from '@/utils/queryUtils'
import { Paginated } from '@/utils/pagination'

export default function useMedias(filters: MediaFilters) {
  const [medias, setMedias] = useState<Media[]>()
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()

  async function refreshMedias(filters: MediaFilters) {
    try {
      const queryParameters = stringifyQueryParams(filters)
      const response = await axios.get<Paginated<Media>>(
        `/api/media${queryParameters}`,
        {
          headers: {
            Authorization: 'secret'
          }
        }
      )
      console.log('responses: ', response.data)
      setMedias(response.data.values)
      setNextPageToken(response.data.nextPageToken)
    } catch (error) {
      setMedias([])
    }
  }

  function nextPage() {
    refreshMedias({ ...filters, pageToken: nextPageToken })
  }

  useEffect(() => {
    refreshMedias(filters)
  }, [])

  return { medias, refreshMedias, nextPage }
}
