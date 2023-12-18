export interface Media {
  type: MediaType
  thumbnail: string
  url: string
  height: number
  width: number
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
  pageToken?: string
}
