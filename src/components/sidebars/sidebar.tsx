'use client'
import * as React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const LINKS = [
  {
    name: 'Trainers',
    href: '/trainers',
  },
  {
    name: 'Training Session',
    href: '/trainers/training-session',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <section className="flex flex-col h-[70%] w-auto mb-7 mt-0 py-10 px-12 z-50 border-2  font-protest bg-white bg-opacity-15  backdrop-blur-lg relative gap-12 items-center">
      <h2 className="text-5xl">FIT101</h2>
      <section className="flex flex-col justify-center items-center text-center gap-7">
        {LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}
      </section>
    </section>
  )
}
