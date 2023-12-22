import { Media } from '@/models/media/mediaTypes'
import { drive_v3 } from 'googleapis'

export const formatGoogleMedia = (medias: drive_v3.Schema$File[]): Media[] => {
  if (!medias) {
    return []
  }
  //console.log('Format media >', medias)
  return medias.map((media: any) => {
    return {
      id: media.id,
      type: media.mimeType,
      src: media.webContentLink,
      url: `https://drive.google.com/uc?export=view&id=${media.id}`,
      thumbnailLarge: `https://drive.google.com/thumbnail?sz=w640&id=${media.id}`,
      thumbnailMedium: `https://drive.google.com/thumbnail?sz=w320&id=${media.id}`,
      thumbnailSmall: `https://drive.google.com/thumbnail?id=${media.id}`,
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
