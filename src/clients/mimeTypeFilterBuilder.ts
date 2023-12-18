import { MediaType } from '@/models/media/mediaTypes'

export const buildMimeTypeFilter = (mediaType?: MediaType): string => {
  if (!mediaType) {
    return ''
  }
  switch (mediaType) {
    case MediaType.IMAGE:
      return '(mimeType="image/jpeg" or mimeType="image/png" or mimeType="image/gif" or mimeType="image/bmp" or mimeType="image/webp" or mimeType="image/tiff" or mimeType="image/ico" or mimeType="image/icon" or mimeType="image/avif")'
    case MediaType.VIDEO:
      return '(mimeType="video/mp4" or mimeType="video/mepg")'
    default:
      return ''
  }
}