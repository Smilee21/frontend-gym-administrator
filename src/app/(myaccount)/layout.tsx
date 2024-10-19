'use client'
import localFont from 'next/font/local'
import '@/config/amplify-auth'
import '@aws-amplify/ui-react/styles.css'
import '../../app/globals.css'
import { Authenticator } from '@aws-amplify/ui-react'
import UserSidebar from '@/components/sidebars/userSidebar'

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const protestStrike = localFont({
  src: '../fonts/ProtestStrike-Regular.ttf',
  variable: '--font-protest-strike',
  weight: '400',
  style: 'normal',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${protestStrike.variable} ${geistMono.variable} antialiased grid grid-cols-[200px_1fr]
`}
      >
        <Authenticator.Provider>
          <div className="flex flex-row">
            <UserSidebar />
            <div className="grid grid-cols-1 absolute items-center justify-center w-[100%]">
              {children}
            </div>
          </div>
        </Authenticator.Provider>
      </body>
    </html>
  )
}
