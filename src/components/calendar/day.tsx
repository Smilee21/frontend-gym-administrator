import './calendar.css'
import { dayColumn } from './days'
import React, { useState } from 'react'
export default function DayColumn() {
  const handleClick = (id: string) => {
    console.log(id)
  }

  const [fullDay, setFullday] = useState(dayColumn)

  return (
    <div className="day-container-column  ">
      {dayColumn.map((day) => (
        <section className="day-column" key={day.dayHeader}>
          <header className="flex justify-center">
            <h3 className="">{day.dayHeader}</h3>
          </header>
          {day.cards.map((dayInfo) => (
            <article
              onClick={() => handleClick(dayInfo.id)}
              className={
                dayInfo.spaces > 0 ? 'card-day' : 'card-day full-day-card'
              }
            >
              <div className="z-40 relative flex flex-col items-center justify-center gap-10">
                <header className="top-[-15px] relative">
                  <h3>{dayInfo.hour}</h3>
                </header>
                <section className="flex flex-col items-center  gap-2">
                  <p>{dayInfo.trainer}</p>
                  <span>
                    {dayInfo.spaces > 0
                      ? 'Available:' + dayInfo.spaces
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
