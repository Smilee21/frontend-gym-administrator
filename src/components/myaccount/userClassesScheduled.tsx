'use client'
import '../calendar-sub.ts/calendar-sub.css'
import { IBooking, ITrainingSessions } from '@/interfaces/training-sessions'
import React, { Suspense, useEffect, useState } from 'react'
import { formatHour } from '@/lib/utils'
import { fetchUserClasses } from '@/app/(myaccount)/myaccount/myaccount.api'
import { useSearchParams } from 'next/navigation'

function ClassesScheduled() {
  const [data, setData] = useState<ITrainingSessions[]>([])
  const searchParams = useSearchParams()
  const email = searchParams.get('client-email')

  useEffect(() => {
    if (email) {
      fetchUserClasses(email)
        .then((result) => {
          setData(result.map((booking: IBooking) => booking.session))
        })
        .catch((error) => {
          console.error('Error fetching user classes:', error)
        })
    }
  }, [email])

  type DaysGrouped = { [key: string]: ITrainingSessions[] }

  const daysGrouped: DaysGrouped = data.reduce((acc: DaysGrouped, info) => {
    const dayKey = info.day
    if (dayKey) {
      acc[dayKey] = acc[dayKey] ? [...acc[dayKey], info] : [info]
    }
    return acc
  }, {})

  const weekOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const sortedDays = Object.keys(daysGrouped).sort(
    (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
  )

  return (
    <div className="day-container-column font-protest ">
      {sortedDays.map((day) => (
        <section className="day-column" key={day}>
          <header className="flex justify-center bg-black py-2 text-white">
            <h3>{day}</h3>
          </header>
          {daysGrouped[day].map((info) => (
            <article
              className={
                (info?.spaces ?? 0) > 0 ? 'card-day' : 'card-day full-day-card'
              }
              key={info.id}
            >
              <div className="z-100 relative flex flex-col items-center justify-center gap-10">
                <header className="top-[-15px] relative">
                  <h3 className="text-4xl">
                    {info.hour ? formatHour(info.hour) : 'Hour Not Available'}
                  </h3>
                </header>
                <section className="flex flex-col items-center gap-2 text-lg">
                  <p>{info.trainer?.name || 'Not Assigned'}</p>
                  <span>
                    {(info.spaces ?? 0) > 0
                      ? 'Available: ' + (info.spaces ?? 0)
                      : 'FULL DAY'}
                  </span>
                </section>
              </div>
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}

export function ClassesScheduledComponent() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <ClassesScheduled></ClassesScheduled>
    </Suspense>
  )
}