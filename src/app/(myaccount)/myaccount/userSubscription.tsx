/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FetchUserAttributesOutput } from 'aws-amplify/auth'
import { getSubscription } from './myaccount.api'
import { SubscriptionUser } from '@/interfaces/subscription'

interface UserInfoProps {
  user: FetchUserAttributesOutput
}

export default function UserSubscription({ user }: UserInfoProps) {
  const [subscription, setSubscription] = useState<SubscriptionUser | null>(
    null
  )

  useEffect(() => {
    getSubscription(user?.email).then((result) => setSubscription(result))
  }, [])

  return (
    <article className="bg-neutral-50 font-thin flex flex-col px-4  gap-2 border-[1px] rounded-sm border-solid border-black shadow-md w-full min-h-48 ">
      <header className="pt-4 text-lg flex self-center">
        <h3>Your Subscription</h3>
      </header>

      {subscription ? (
        <section>
          <p>
            <span className="font-protest text-xl">Start Date: </span>
            {subscription.subscription.start_date.toString()}
          </p>
          <p>
            <span className="font-protest text-xl">End Date: </span>
            {subscription.subscription.end_date.toString()}
          </p>
          <p>
            <span className="font-protest text-xl">Type: </span>
            {subscription.subscription.plan_type.toUpperCase()}
          </p>
        </section>
      ) : (
        <section className="flex self-center">
          <Link className="font-protest " href="/myaccount/subscribe">
            Subscribe Now!
          </Link>
        </section>
      )}
    </article>
  )
}
