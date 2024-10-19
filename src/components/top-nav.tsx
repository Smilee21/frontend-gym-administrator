import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

export default function TopNavigation() {
  return (
    <header className="w-full h-24 z-50 font-protest  bg-white bg-opacity-15 m-0 backdrop-blur-lg flex justify-between fixed px-24">
      <h2 className="self-center text-5xl ">FIT101</h2>
      <NavigationMenu className="self-center text-lg">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="">Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/trainers" legacyBehavior passHref>
              <NavigationMenuLink className="">Trainers</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/myaccount" legacyBehavior passHref>
              <NavigationMenuLink className="">Account</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
