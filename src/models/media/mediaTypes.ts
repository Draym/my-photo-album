export interface Media {
  id: string
  type: MediaType
  src: string
  url: string
  thumbnailLarge: string
  thumbnailMedium: string
  thumbnailSmall: string
  height?: number
  width?: number
  time: string
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface MediaFilters {
  folder?: string
  type?: MediaType
  month?: string
  year?: string
  pageMaxSize?: number
  pageToken?: string
}
