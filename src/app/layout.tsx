'use client'
import localFont from 'next/font/local'
import TopNavigation from '@/components/top-nav'
import '@/config/amplify-auth'
import '@aws-amplify/ui-react/styles.css'
import './globals.css'
import { Authenticator } from '@aws-amplify/ui-react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNavigation />
        <Authenticator.Provider>
          <div className="pt-24 mx-24">{children}</div>
        </Authenticator.Provider>
      </body>
    </html>
  )
}
