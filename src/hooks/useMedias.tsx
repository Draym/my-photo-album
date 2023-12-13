import axios from 'axios'
import { useEffect, useState } from 'react'
import { Media, MediaFilters } from '@/models/media/mediaTypes'
import { stringifyParams } from '@/utils/queryUtils'

export default function useMedias(filters: MediaFilters) {
  const [medias, setMedias] = useState<Media[]>()

  async function refreshMedias(filters: MediaFilters) {
    try {
      const queryParameters = stringifyParams(filters)
      const response = await axios.get<Media[]>(
        `/api/media${queryParameters.length > 0 ? `?${queryParameters}` : ''}`,
        {
          headers: {
            Authorization: 'secret'
          }
        }
      )
      console.log('responses: ', response.data)
      setMedias(response.data)
    } catch (error) {
      setMedias([])
    }
  }

  useEffect(() => {
    refreshMedias(filters)
  }, [])

  return { medias, refreshMedias }
}
