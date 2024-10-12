import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { runWithAmplifyServerContext } from '@/utils/amplify-server-util'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec)

        const rolesToCheck = ['Admin', 'Trainer']
        const groups = session.tokens?.idToken?.payload['cognito:groups']
        const isUser = session.tokens?.idToken !== undefined

        const userGroups: string[] = Array.isArray(groups)
          ? (groups as string[])
          : []

        if (request.nextUrl.pathname.startsWith('/trainers')) {
          const hasAccess = rolesToCheck.some((role) =>
            userGroups.includes(role)
          )
          if (hasAccess) {
            return response
          }

          return isUser
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
  })

  if (authenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - root (/) path
     */
    '/trainers/:path*',
    '/user/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|unauthorized|login).+)',
  ],
}
