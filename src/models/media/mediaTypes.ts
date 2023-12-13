export interface Media {
  type: MediaType
  url: string
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
}
