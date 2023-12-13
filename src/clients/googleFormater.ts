import { Media } from '@/models/media/mediaTypes'
import { drive_v3 } from 'googleapis'

export const formatGoogleMedia = (medias:  drive_v3.Schema$File[]): Media[] => {
  if (!medias) {
    return []
  }
  return medias.map((media: any) => {
    return {
      type: media.type,
      url: media.webViewLink
    }
  })
}