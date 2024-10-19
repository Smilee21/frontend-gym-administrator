'use client'
import React from 'react'
import './pricing.css'
import { DialogComponentSuscribe } from '@/components/Dialog/dialog'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDialogSuscribe } from '@/hooks/useDialogSuscribe'

const plans = [
  {
    id: 1,
    name: 'Monthly Plan',
    benefits: [
      'Access to 4 cycling sessions per month',
      'Use of basic gym equipment',
      'No contract, cancel anytime',
      'Free consultation with a trainer once per month',
    ],
  },
  {
    id: 2,
    name: 'Quarterly Plan',
    benefits: [
      'Access to 12 cycling sessions over 3 months',
      'Use of all gym equipment, including premium bikes',
      'Priority booking for cycling classes',
      'Access to online workout resources',
      'Monthly fitness assessment',
    ],
  },
  {
    id: 3,
    name: 'Annual Plan',
    benefits: [
      'Unlimited cycling sessions for the entire year',
      'Personalized training program',
      'Access to all gym facilities, including sauna and pool',
      'Free nutrition plan and diet consultation',
      'Complimentary sports massage once per month',
      '10% discount on gym merchandise',
    ],
  },
]

export default function Princing() {
  const { onOpen } = useDialogSuscribe()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const handleSubscribe = (id: number) => {
    const params = new URLSearchParams(searchParams)
    if (id) {
      params.set('subscription', id.toLocaleString())
    } else {
      params.delete('subscription')
    }

    replace(`${pathname}?${params.toString()}`)
    onOpen()
  }

  return (
    <section className="relative w-full h-screen mb-12">
      <section>
        <header className="font-protest text-5xl relative mb-7 mt-7 flex justify-center ">
          <h2>Pricing</h2>
        </header>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-between">
        {plans.map((plan) => (
          <article
            key={plan.id.toLocaleString()}
            onClick={() => {
              if (plan.id !== undefined) {
                handleSubscribe(plan.id)
              } else {
                console.warn('ID is undefined')
              }
            }}
            id={plan.id.toString()}
            className="flex flex-col border-solid border-[1.5px] border-black p-12 pt-6 gap-6 shadow-md shadow-gray-400
            card-pricing relative
            hover:text-white
            transition ease-in duration-200
            "
          >
            <header className="self-center">
              <h3>{plan.name}</h3>
            </header>
            <section>
              <ul className="flex flex-col gap-3">
                {plan.benefits.map((benefit) => (
                  <li className="" key={plan.id.toLocaleString()}>
                    * {benefit}
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </section>
      <DialogComponentSuscribe />
    </section>
  )
}
