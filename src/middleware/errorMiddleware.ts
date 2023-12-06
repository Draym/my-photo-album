import { NextRequest, NextResponse } from 'next/server'

const _errorHandler = (err: any) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  return NextResponse.json({ error: message }, { status })
}

export const errorMiddleware = (apis: any) => {
  const wrappedHandler: any = {}
  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

  // wrap handler methods to add middleware and global error handler
  httpMethods.forEach((method) => {
    if (typeof apis[method] !== 'function') return

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        return await apis[method](req, ...args)
      } catch (err: any) {
        return _errorHandler(err)
      }
    }
  })

  return wrappedHandler
}
