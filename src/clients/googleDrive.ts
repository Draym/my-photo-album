import { drive_v3, google } from 'googleapis'
import { Media, MediaFilters } from '@/models/media/mediaTypes'
import { Paginated } from '@/utils/pagination'
import { buildMimeTypeFilter } from '@/clients/mimeTypeFilterBuilder'

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/drive']
})
const drive = google.drive({ version: 'v3', auth })

const medias: { [key: string]: Media } = {}

const searchImages = async (
  query: MediaFilters
): Promise<Paginated<drive_v3.Schema$File>> => {
  try {
    const mimeFilter = buildMimeTypeFilter(query.type)
    const params = []
    if (query.folder) {
      params.push(`'${query.folder}' in parents`)
    }
    if (mimeFilter.length != 0) {
      params.push(mimeFilter)
    }
    params.push(`trashed = false`)
    const request = params.join(' and ')
    console.log(`search files query: `, query, request)
    const res = await drive.files.list({
      q: request,
      fields:
        'nextPageToken, files(id, name, webViewLink, webContentLink, mimeType, imageMediaMetadata, videoMediaMetadata, thumbnailLink)',
      supportsAllDrives: true,
      pageSize: query.pageMaxSize,
      pageToken: query.pageToken
    })
    //console.log('response: ', res.data.files)
    return new Paginated(
      res.data.files || [],
      res.data.nextPageToken || undefined
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getImage = async (fileId: string): Promise<drive_v3.Schema$File> => {
  try {
    const res = await drive.files.get({
      fileId,
      fields:
        'files(id, name, webViewLink, mimeType, imageMediaMetadata, videoMediaMetadata, thumbnailLink)'
    })
    return res.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  searchImages,
  getImage
}
