import * as React from 'react'
import { FetchUserAttributesOutput } from 'aws-amplify/auth'

interface UserInfoProps {
  user: FetchUserAttributesOutput
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="bg-neutral-50 font-thin flex flex-col py-16 px-4  gap-2 border-[1px] rounded-sm border-solid border-black shadow-md w-full relative min-h-48 ">
      <header className="">
        <h3>Welcome {user?.name}</h3>
      </header>
      <section className="flex flex-col">
        <p>
          <span className="font-bold">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {user?.phone_number}
        </p>
      </section>
    </section>
  )
}
