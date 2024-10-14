import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { runWithAmplifyServerContext } from '@/utils/amplify-server-util'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      const pass = {
        isUser: false,
        isAdmin: false,
      }

      try {
        const session = await fetchAuthSession(contextSpec)

        const rolesToCheck = ['Admin', 'Trainer']
        const groups = session.tokens?.idToken?.payload['cognito:groups']
        const isUser = session.tokens?.idToken !== undefined
        pass.isUser = isUser

        const userGroups: string[] = Array.isArray(groups)
          ? (groups as string[])
          : []

        if (request.nextUrl.pathname.startsWith('/trainers')) {
          const isAdmin = rolesToCheck.some((role) => userGroups.includes(role))
          pass.isAdmin = isAdmin
        }

        return pass
      } catch (error) {
        console.log(error)
        pass.isUser = false
        pass.isAdmin = false

        return pass
      }
    },
  })

  if (!authenticated.isUser && !authenticated.isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authenticated.isAdmin) {
    return response
  }

  if (authenticated.isUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return
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
