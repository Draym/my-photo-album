import axios from 'axios'
import { useEffect, useState } from 'react'
import { Media, MediaFilters } from '@/models/media/mediaTypes'
import { stringifyQueryParams } from '@/utils/queryUtils'
import { Paginated } from '@/utils/pagination'

export default function useMedias(filters: MediaFilters) {
  const [loading, setLoading] = useState(false)
  const [medias, setMedias] = useState<Media[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()

  async function fetchMedias(filters: MediaFilters): Promise<Paginated<Media>> {
    const queryParameters = stringifyQueryParams(filters)
    const response = await axios.get<Paginated<Media>>(
      `/api/media${queryParameters}`,
      {
        headers: {
          Authorization: 'secret'
        }
      }
    )
    return response.data
  }

  async function refreshFromZero(loading: boolean) {
    if (loading) {
      return
    }
    try {
      setLoading(true)
      const response = await fetchMedias(filters)
      setMedias(response.values)
      setNextPageToken(response.nextPageToken)
    } catch (error) {
      setMedias([])
    } finally {
      setLoading(false)
    }
  }


  const nextPage = async (loading: boolean, nextPageToken?: string) => {
    if (loading || !nextPageToken) {
      return
    }
    try {
      setLoading(true)
      const response = await fetchMedias({
        ...filters,
        pageToken: nextPageToken
      })
      setMedias((prevData) => [...prevData, ...response.values])
      setNextPageToken(response.nextPageToken)
    } catch (error) {
      setMedias([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshFromZero(loading)
  }, [])

  return {
    medias,
    nextPageToken,
    loading,
    nextPage,
    refreshFromZero
  }
}
