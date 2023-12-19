import { NextRequest, NextResponse } from 'next/server'
import { Media, MediaFilters, MediaType } from '@/models/media/mediaTypes'
import { errorMiddleware } from '@/middleware/errorMiddleware'
import { authMiddleware } from '@/middleware/authMiddleware'
import googleDrive from '@/clients/googleDrive'
import { formatGoogleMedia } from '@/clients/googleFormater'
import { Paginated } from '@/utils/pagination'

const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { folder, type, month, year, pageMaxSize, pageToken } = Object.fromEntries(
    req.nextUrl.searchParams
  )
  const pagedMedias = await _listProjects({
    folder,
    type: type as MediaType,
    month,
    year,
    pageMaxSize: Number(pageMaxSize),
    pageToken
  })
  return NextResponse.json(pagedMedias, { status: 200 })
}

async function _listProjects(filters: MediaFilters): Promise<Paginated<Media>> {
  const googleMedias = await googleDrive.searchImages(filters)
  const medias = formatGoogleMedia(googleMedias.values)
  return new Paginated(medias, googleMedias.nextPageToken)
}

module.exports = errorMiddleware({
  GET: authMiddleware(GET)
})
