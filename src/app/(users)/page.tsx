import CustomCalendar from '@/components/calendar/calendar'
import Princing from '@/components/pricing/pricing'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <Suspense fallback={<div>Loading...</div>}>
        <CustomCalendar></CustomCalendar>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Princing></Princing>
      </Suspense>
    </div>
  )
}
