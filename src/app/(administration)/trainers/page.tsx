'use client'
import TableTrainers from '@/components/panel/table-trainers'
import { Authenticator } from '@aws-amplify/ui-react'
export default function Trainers() {
  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex flex-col justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20">
        <TableTrainers></TableTrainers>
      </div>
    </Authenticator>
  )
}
