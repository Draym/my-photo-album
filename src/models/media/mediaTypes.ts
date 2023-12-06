export interface Media {
  type: MediaType
  url: string
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface MediaFilters {
  type?: MediaType
  month?: number
  year?: number
}
