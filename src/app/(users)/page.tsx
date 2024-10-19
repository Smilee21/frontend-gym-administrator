import CustomCalendar from '@/components/calendar/calendar'
import Princing from './pricing'

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <CustomCalendar></CustomCalendar>
      <Princing></Princing>
    </div>
  )
}
