import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Edit, Trash2, Plus } from 'lucide-react'
import { ITrainer, ITrainingSessions } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TableTrainingSessions() {
  const [sessions, setSessions] = useState<ITrainingSessions[]>()
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}`)
      const result: ITrainingSessions[] = await response.json()
      setSessions(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleViewTrainer = (trainer: ITrainer | string | null) => {
    if (typeof trainer === 'object' && trainer !== null) {
      setSelectedTrainer(trainer)
      console.log(selectedTrainer)
    } else {
      console.log(`No detailed info available for trainer: ${trainer}`)
    }
  }

  return (
    <div className="container mx-auto">
      <header className="flex justify-center mb-7 font-mono text-3xl">
        <h2>Training Sessions</h2>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Hour</TableHead>
            <TableHead>Spaces</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead>Actions</TableHead>
            <TableHeader>
              <Link
                href={'training-session/create'}
                className="p-1 flex justify-center items-center hover:bg-slate-200 active:bg-slate-300 border-[1px] border-solid border-gray-400 shadow-md rounded-sm"
              >
                <Plus className="h-4 w-4" color="green" />
              </Link>
            </TableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {new Date(item?.createdAt || '').toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(item?.updateAt || '').toLocaleString()}
              </TableCell>
              <TableCell>{item.day}</TableCell>
              <TableCell>{item.hour}</TableCell>
              <TableCell>{item.spaces}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>
                {item.trainer ? (
                  <button
                    onClick={() => handleViewTrainer(item?.trainer ?? null)}
                    className="text-blue-600 hover:underline focus:outline-none"
                  >
                    {item.trainer.name}
                  </button>
                ) : (
                  'No trainer assigned'
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link
                    href={`training-session/edit/${item.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`trainers/delete/${item.id}`}
                    className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4" color="black" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
