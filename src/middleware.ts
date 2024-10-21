import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { runWithAmplifyServerContext } from '@/utils/amplify-server-util'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  return runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
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

        // Verificación para la ruta /trainers
        if (request.nextUrl.pathname.startsWith('/trainers')) {
          const isAdmin =
            userGroups.includes('Admin') || userGroups.includes('Trainer')
          if (!isAdmin) {
            // Redirige a la página principal si no tiene el rol requerido
            return NextResponse.redirect(new URL('/myaccount', request.url))
          }
          // Permitir acceso si es Admin o Trainer
          return NextResponse.next()
        }

        // Verificación para la ruta /myaccount
        if (request.nextUrl.pathname.startsWith('/myaccount')) {
          const isUser = !!session.tokens?.idToken
          if (!isUser) {
            // Redirige a la página principal si no está autenticado
            return NextResponse.redirect(new URL('/', request.url))
          }
          // Permitir acceso si el usuario está autenticado
          return NextResponse.next()
        }

        // Redirige a la página principal por defecto si no cumple las condiciones
        return NextResponse.redirect(new URL('/', request.url))
      } catch (error) {
        console.error('Error fetching session:', error)
        // Redirige a la página principal en caso de error
        return NextResponse.redirect(new URL('/', request.url))
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
