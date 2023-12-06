import { NextRequest, NextResponse } from 'next/server'
import { GetMediaRequest } from '@/app/api/media/types'
import { Media, MediaFilters } from '@/models/media/mediaTypes'
import { errorMiddleware } from '@/middleware/errorMiddleware'
import { authMiddleware } from '@/middleware/authMiddleware'

const GET = async (
  req: NextRequest,
  { query }: GetMediaRequest
): Promise<NextResponse> => {
  const medias = await _listProjects(query)
  return NextResponse.json({ medias }, { status: 200 })
}

async function _listProjects(filters: MediaFilters): Promise<Media[]> {
  return []
}

module.exports = errorMiddleware({
  GET: authMiddleware(GET)
})
