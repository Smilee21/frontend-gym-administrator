'use client'
import './calendar-sub.css'
import { ITrainingSessions } from '@/interfaces/training-sessions'
import React, { Suspense, useEffect, useState } from 'react'
import { formatHour } from '@/lib/utils'
import { DialogComponent } from '../Dialog/dialog'
import { useDialog } from '@/hooks/useDialog'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function DayColumnContent() {
  const [data, setData] = useState<ITrainingSessions[]>([])
  const { onOpen } = useDialog()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}`)
        const result: ITrainingSessions[] = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleClick = async ({
    id,
    spaces,
  }: {
    id: number
    spaces: number | undefined
  }) => {
    const params = new URLSearchParams(searchParams)

    if (id && spaces) {
      params.set('training-session', id.toLocaleString())
      params.set('spaces', spaces?.toLocaleString())
    } else {
      params.delete('training-session')
    }

    replace(`${pathname}?${params.toString()}`)
    onOpen()
  }

  type DaysGrouped = { [key: string]: ITrainingSessions[] }

  const daysGrouped: DaysGrouped = data?.reduce((acc: DaysGrouped, info) => {
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
              onClick={() => {
                if (
                  info.id !== undefined &&
                  info.spaces !== undefined &&
                  info.spaces > 0
                ) {
                  handleClick({ id: info.id, spaces: info.spaces })
                } else {
                  console.warn('ID is undefined')
                }
              }}
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
      <DialogComponent />
    </div>
  )
}

export default function DayColumnSub() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DayColumnContent />
    </Suspense>
  )
}
