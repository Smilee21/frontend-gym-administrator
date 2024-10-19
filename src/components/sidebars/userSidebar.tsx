'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import './sidebar.css'
import { usePathname } from 'next/navigation'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

const LINKS = [
  {
    name: 'Account',
    href: '/myaccount',
  },
  {
    name: 'Home',
    href: '/',
  },
]

export default function UserSidebar() {
  const [iconHide, setIconHide] = useState(false)
  const [hideSedebar, setHideSidebar] = useState(false)
  const pathname = usePathname()

  const onHide = () => {
    console.log(iconHide)
    setIconHide(!iconHide)
    setHideSidebar(!hideSedebar)
  }

  return (
    <>
      <button className="absolute z-[100]" onClick={onHide}>
        <ArrowBigLeft
          className={`rounded-md shadow-md active:shadow-sm ${
            iconHide ? 'hideIcon' : ''
          }`}
          width={'40px'}
        ></ArrowBigLeft>
        <ArrowBigRight
          className={`rounded-md shadow-md active:shadow-sm ${
            !iconHide ? 'hideIcon' : ''
          }`}
          width={'40px'}
        ></ArrowBigRight>
      </button>
      <section
        className={` flex flex-col h-[100%] w-auto mb-7 mt-0 py-10 px-12 z-50 font-protest bg-white bg-opacity-15 border-2 backdrop-blur-lg relative gap-12 items-center  ${
          iconHide ? 'hideIcon' : ''
        } `}
      >
        <h2 className="text-4xl">FIT101</h2>
        <section className="flex flex-col justify-center items-center text-center gap-7">
          {LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium hover:bg-black hover:border-2 hover:border-white hover:text-white md:flex-none  md:justify-start md:p-2 md:px-3',
                {
                  'bg-black border-2 rounded-sm border-white text-white':
                    pathname === link.href,
                }
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          ))}
        </section>
      </section>
    </>
  )
}
