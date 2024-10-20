import DayColumnSub from '@/components/calendar/day'
import React, { useState } from 'react'
import './user-clasess.css'

export default function UserClasses() {
  const [section, onSectionChange] = useState(false)

  return (
    <section className="bg-neutral-50 font-thin flex flex-col pt-6 px-4 relative  border-[1px] rounded-sm border-solid border-black shadow-md w-[80%] h-80 overflow-auto ">
      <header
        onClick={() => onSectionChange(!section)}
        className="flex gap-2 font-protest text-2xl justify-center cursor-pointer select-none"
      >
        <h3
          className={`${
            section ? 'selected' : 'no-selected'
          } cursor-pointer select-none`}
        >
          Schedule{' '}
        </h3>
        <p className="selected"> / </p>
        <h3
          className={`${
            !section ? 'selected' : 'no-selected'
          } cursor-pointer select-none`}
        >
          Your Classes
        </h3>
      </header>
      {section ? (
        <DayColumnSub></DayColumnSub>
      ) : (
        <section>
          <p>tus classes agendadas</p>
        </section>
      )}
    </section>
  )
}
