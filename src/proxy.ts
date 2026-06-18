import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from './lib/session'
import { cookies } from 'next/headers'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
    
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
