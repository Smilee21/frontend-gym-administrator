import './calendar.css'
import { ITrainingSessions, ITrainer } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'

export default function DayColumn() {
  const [data, setData] = useState<ITrainingSessions[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/training-session/')
        const result: ITrainingSessions[] = await response.json()
        console.log(result)
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

  return (
    <div className="day-container-column">
      {data.map((el) => (
        <section className="day-column" key={el.id}>
          <header className="flex justify-center">
            <h3 className="">{el.day}</h3>
          </header>

          <article
            className={el.spaces > 0 ? 'card-day' : 'card-day full-day-card'}
            onClick={() => handleClick(el.id)}
          >
            <div className="z-40 relative flex flex-col items-center justify-center gap-10">
              <header className="top-[-15px] relative">
                <h3>{el.hour}</h3>
              </header>
              <section className="flex flex-col items-center  gap-2">
                <p>{el.trainer?.name || 'Not Asigned'}</p>
                <span>
                  {el.spaces > 0 ? 'Available:' + el.spaces : 'FULL DAY'}
                </span>
              </section>
            </div>
          </article>
        </section>
      ))}
    </div>
  )
}
