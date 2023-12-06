import { NextRequest, NextResponse } from 'next/server'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { HttpError } from '@/utils/httpError'

const _validateAuthentication = (headers: ReadonlyHeaders) => {
  const secret = headers.get('Authorization')
  if (secret !== process.env.AUTH_SECRET) {
    throw new HttpError('Not Authorized', 401)
  }
}

export const authMiddleware = (
  api: (req: NextRequest, ...args: any) => Promise<NextResponse>
) => {
  return async (req: NextRequest, ...args: any) => {
    _validateAuthentication(req.headers)
   return await api(req, ...args)
  }
}
