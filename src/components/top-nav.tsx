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
    <header className="w-full h-24 z-50  bg-white bg-opacity-15 m-0 backdrop-blur-lg flex justify-between fixed px-24">
      <h2 className="self-center">FIT101</h2>
      <NavigationMenu className="self-center">
        <NavigationMenuList className="flex gap-8">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className="">home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className="">about us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/trainers" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className="">trainers</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
