import { NextRequest, NextResponse } from 'next/server'
import { GetMediaRequest } from '@/app/api/media/types'
import { Media, MediaFilters, MediaType } from '@/models/media/mediaTypes'
import { errorMiddleware } from '@/middleware/errorMiddleware'
import { authMiddleware } from '@/middleware/authMiddleware'
import googleDrive from '@/clients/googleDrive'
import { formatGoogleMedia } from '@/clients/googleFormater'

const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { folder, type, month, year } = Object.fromEntries(
    req.nextUrl.searchParams
  )
  const medias = await _listProjects({
    folder,
    type: type as MediaType,
    month,
    year
  })
  return NextResponse.json({ medias }, { status: 200 })
}

async function _listProjects(filters: MediaFilters): Promise<Media[]> {
  const googleMedias = await googleDrive.searchImages(filters)
  return formatGoogleMedia(googleMedias)
}

module.exports = errorMiddleware({
  GET: authMiddleware(GET)
})
