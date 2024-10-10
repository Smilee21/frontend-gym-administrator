import './calendar.css'
import { ITrainingSessions } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import { formatHour } from '@/lib/utils'

export default function DayColumn() {
  const [data, setData] = useState<ITrainingSessions[]>([])

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

  const handleClick = (id: number) => {
    console.log(id)
  }

  type DaysGrouped = { [key: string]: ITrainingSessions[] }

  const daysGrouped: DaysGrouped = data.reduce((acc: DaysGrouped, info) => {
    const dayKey = info.day // Obtiene el valor de info.day

    // Verifica si dayKey es una cadena válida
    if (dayKey) {
      acc[dayKey] = acc[dayKey] ? [...acc[dayKey], info] : [info]
    }

    return acc
  }, {})

  return (
    <div className="day-container-column">
      {Object.entries(daysGrouped).map(([day, classes]) => (
        <section className="day-column" key={day}>
          <header className="flex justify-center">
            <h3>{day}</h3>
          </header>
          {classes.map((info) => (
            <article
              className={
                (info?.spaces ?? 0) > 0 ? 'card-day' : 'card-day full-day-card'
              }
              onClick={() => {
                if (info.id !== undefined) {
                  handleClick(info.id)
                } else {
                  console.warn('ID is undefined')
                }
              }}
              key={info.id}
            >
              <div className="z-100 relative flex flex-col items-center justify-center gap-10">
                <header className="top-[-15px] relative">
                  <h3>
                    {info.hour ? formatHour(info.hour) : 'Hour Not Available'}
                  </h3>
                </header>
                <section className="flex flex-col items-center gap-2">
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
