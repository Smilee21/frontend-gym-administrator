import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { runWithAmplifyServerContext } from '@/utils/amplify-server-util'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  return runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      const pass = {
        isUser: false,
        isAdmin: false,
      }

      try {
        const session = await fetchAuthSession(contextSpec)

        if (session.tokens?.idToken) {
          response.headers.set(
            'Authorization',
            `Bearer ${session.tokens.idToken}`
          )
        }

        const groups = session.tokens?.idToken?.payload['cognito:groups'] || []

        const userGroups: string[] = Array.isArray(groups)
          ? groups.filter((group): group is string => typeof group === 'string')
          : []

        if (request.nextUrl.pathname.startsWith('/trainers')) {
          pass.isAdmin =
            userGroups.includes('Admin') || userGroups.includes('Trainer')

          console.log('entra enlo de trainers')

          if (pass.isAdmin) {
            console.log(pass.isAdmin)
            return NextResponse.next()
          } else {
            console.log('hola bro jajaj else')
            return NextResponse.redirect(new URL('/myaccount', request.url))
          }
        }

        if (request.nextUrl.pathname.startsWith('/myaccount')) {
          console.log('myaccountadsasdas')

          pass.isUser = !!session.tokens?.idToken
          if (pass.isUser) return NextResponse.next()
        }

        NextResponse.redirect(new URL('/', request.url))
      } catch (error) {
        console.error('Error fetching session:', error)
        NextResponse.redirect('/')
      }
    },
  })
}

export const config = {
  matcher: [
    '/trainers/:path*',
    '/user/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|unauthorized|myaccount).+)',
  ],
}
