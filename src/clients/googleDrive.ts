import { drive_v3, google } from 'googleapis'
import { MediaFilters } from '@/models/media/mediaTypes'
import { Paginated } from '@/utils/pagination'
import { buildMimeTypeFilter } from '@/clients/mimeTypeFilterBuilder'

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/drive']
})
const drive = google.drive({ version: 'v3', auth })

const searchImages = async (
  query: MediaFilters
): Promise<Paginated<drive_v3.Schema$File>> => {
  try {
    console.log(`search files query: `, query)
    const mimeFilter = buildMimeTypeFilter(query.type)
    const res = await drive.files.list({
      q: `'${query.folder}' in parents ${
        mimeFilter.length != 0 ? `and ${mimeFilter}` : ''
      }`,
      fields:
        'nextPageToken, files(id, name, webViewLink, webContentLink, mimeType, imageMediaMetadata, videoMediaMetadata, thumbnailLink)',
      supportsAllDrives: true,
      pageSize: query.pageMaxSize,
      pageToken: query.pageToken
    })
    return new Paginated(
      res.data.files || [],
      res.data.nextPageToken || undefined
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  searchImages
}
