'use client'
import TableTrainingSessions from '@/components/panel/table-training-session'
import { Authenticator } from '@aws-amplify/ui-react'
export default function Trainers() {
  return (
    <Authenticator>
      <div className="flex flex-col justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20">
        <TableTrainingSessions></TableTrainingSessions>
      </div>
    </Authenticator>
  )
}
