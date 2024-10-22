'use client'
import React, { useEffect, useState } from 'react'
import './subscribe-options.css'
import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from 'aws-amplify/auth'
import { subscribeUser } from '@/app/(myaccount)/myaccount/myaccount.api'

const plans = [
  {
    id: 56,
    plan_type: 'monthly',
    name: 'Monthly Plan',
    benefits: [
      'Access to 4 cycling sessions per month',
      'Use of basic gym equipment',
      'No contract, cancel anytime',
      'Free consultation with a trainer once per month',
    ],
  },
  {
    id: 34,
    plan_type: 'quarterly',
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
    id: 45,
    plan_type: 'annual',
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

export default function SubscribeOptions() {
  const [info, setInfo] = useState<FetchUserAttributesOutput | null>(null)

  const getDataUser = async () => {
    const data = await fetchUserAttributes()
    setInfo(data)
  }

  useEffect(() => {
    getDataUser()
  }, [])

  const handleSubscribe = async (id: number, plan_type: string) => {
    //objeto que espera el servicio
    // {
    //   "email": "ejemplo@dominio.com",
    //   "name": "Juan",
    //   "family_name": "Pérez",
    //   "phone": "123456789",
    //   "plan_type": "monthly"
    // }

    const { email, name, family_name, phone_number } = info || {}

    // Verificar que todos los campos requeridos no sean undefined
    if (email && name && family_name && phone_number) {
      const data = {
        email,
        name,
        family_name,
        phone: phone_number,
        plan_type,
      }

      await subscribeUser(data)
    }
  }

  return (
    <section className="relative w-[80%] h-full mb-12">
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
                handleSubscribe(plan.id, plan.plan_type)
              } else {
                console.warn('ID is undefined')
              }
            }}
            id={plan.id.toString()}
            className="flex flex-col border-solid border-[1.5px] border-black p-12 pt-6 gap-6 shadow-md shadow-gray-400
            card-pricing relative cursor-pointer
            hover:text-white 
            transition ease-in duration-200
            "
          >
            <header className="self-center">
              <h3>{plan.name}</h3>
            </header>
            <section>
              <ul className="flex flex-col gap-3">
                {plan.benefits.map((benefit, index) => (
                  <li key={`${plan.id}-${index}`}>* {benefit}</li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </section>
    </section>
  )
}
