'use client'

import './calendar.css'
import DayColumn from './day'

export default function CustomCalendar() {
  return (
    <section className="relative w-full h-[80%] mb-12">
      <header className="font-protest text-5xl relative mb-7 mt-7 flex justify-center ">
        <h2>CICLYST</h2>
      </header>
      <DayColumn></DayColumn>
    </section>
  )
}
