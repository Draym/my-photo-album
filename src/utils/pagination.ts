export class Paginated <T> {
  values: T[]
  nextPageToken?: string

  constructor(values: T[], nextPageToken?: string) {
    this.values = values
    this.nextPageToken = nextPageToken
  }
}