'use client'

import './calendar.css'
import DayColumn from './day'

export default function CustomCalendar() {
  return (
    <section className="relative w-full h-screen  mb-12">
      <header className="relative mb-7 mt-7 flex justify-center">
        CICLYST
      </header>
      <DayColumn></DayColumn>
    </section>
  )
}
