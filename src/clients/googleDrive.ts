import { drive_v3, google } from 'googleapis'
import { MediaFilters } from '@/models/media/mediaTypes'

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
  ]
})
const drive = google.drive({ version: 'v3', auth })

const searchImages = async (
  query: MediaFilters
): Promise<drive_v3.Schema$File[]> => {
  try {
    console.log(`search files query: ${query}`)
    const res = await drive.files.list({
      q: `'${query.folder}' in parents`,
      supportsAllDrives: true
    })
    console.log(`search files: ${res.data.files}`)
    res.data.files?.forEach(function (file) {
      console.log('Found file:', file.name, file.id)
    })
    return res.data.files || []
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  searchImages
}
