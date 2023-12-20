import { Media } from '@/models/media/mediaTypes'
import { drive_v3 } from 'googleapis'

export const formatGoogleMedia = (medias: drive_v3.Schema$File[]): Media[] => {
  if (!medias) {
    return []
  }
  //console.log('Format media >', medias)
  return medias.map((media: any) => {
    return {
      type: media.mimeType,
      url: media.webContentLink,
      thumbnail: media.thumbnailLink,
      height:
        media.imageMediaMetadata?.height ||
        media.videoMediaMetadata?.height ||
        undefined,
      width:
        media.imageMediaMetadata?.width ||
        media.videoMediaMetadata?.width ||
        undefined,
      time: media.imageMediaMetadata?.time
    }
  })
}
