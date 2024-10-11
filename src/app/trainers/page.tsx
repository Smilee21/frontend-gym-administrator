'use client'
import TableTrainers from '@/components/panel/table-trainers'
import TableTrainingSessions from '@/components/panel/table-training-session'
import { Authenticator } from '@aws-amplify/ui-react'
export default function About() {
  return (
    <Authenticator>
      <div className="grid grid-rows-[360px_1fr] justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20">
        <TableTrainingSessions></TableTrainingSessions>
        <TableTrainers></TableTrainers>
      </div>
    </Authenticator>
  )
}
