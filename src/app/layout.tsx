'use client'
import localFont from 'next/font/local'
import TopNavigation from '@/components/top-nav'
import '@/config/amplify-auth'
import '@aws-amplify/ui-react/styles.css'
import './globals.css'
import { Authenticator } from '@aws-amplify/ui-react'

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const protestStrike = localFont({
  src: './fonts/ProtestStrike-Regular.ttf',
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
        className={`${protestStrike.variable} ${geistMono.variable} antialiased`}
      >
        <TopNavigation />
        <Authenticator.Provider>
          <div className="pt-24 mx-24">{children}</div>
        </Authenticator.Provider>
      </body>
    </html>
  )
}
