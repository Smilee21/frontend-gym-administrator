import './calendar.css'
import { ITrainingSessions, ITrainer } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import { formatHour } from '@/lib/utils'

export default function DayColumn() {
  const [data, setData] = useState<ITrainingSessions[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/training-session')
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

  // Agrupar las sesiones por día
  const daysGrouped: DaysGrouped = data.reduce((acc: DaysGrouped, info) => {
    acc[info.day] = acc[info.day] ? [...acc[info.day], info] : [info]
    return acc
  }, {})

  // Renderizar
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
                info.spaces > 0 ? 'card-day' : 'card-day full-day-card'
              }
              onClick={() => handleClick(info.id)}
              key={info.id}
            >
              <div className="z-100 relative flex flex-col items-center justify-center gap-10">
                <header className="top-[-15px] relative">
                  <h3>{formatHour(info.hour)}</h3>
                </header>
                <section className="flex flex-col items-center gap-2">
                  <p>{info.trainer?.name || 'Not Assigned'}</p>
                  <span>
                    {info.spaces > 0 ? 'Available: ' + info.spaces : 'FULL DAY'}
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
