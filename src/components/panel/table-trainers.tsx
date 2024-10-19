import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Edit, Trash2, Plus } from 'lucide-react'
import { ITrainer } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function TableTrainers() {
  const [trainer, setTrainer] = useState<ITrainer[]>()

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_TRAINERS}`)
      const result: ITrainer[] = await response.json()
      setTrainer(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container flex flex-col justify-center gap-2 mx-auto w-[80%]">
      <header className="font-protest text-3xl flex flex-row justify-center w-[100%] self-center border border-white rounded-sm  bg-black text-white p-3 shadow-lg">
        <h2>Trainers</h2>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Actions</TableHead>
            <TableHeader>
              <Link
                href={'trainers/create'}
                className="p-1 flex justify-center items-center hover:bg-slate-200 active:bg-slate-300 border-[1px] border-solid border-gray-400 shadow-md rounded-sm"
              >
                <Plus className="h-4 w-4" color="green" />
              </Link>
            </TableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainer?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.specialty}</TableCell>
              <TableCell>{item.contactInfo}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link
                    href={`trainers/edit/${item.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`trainers/delete/${item.id}`}
                    className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4" />
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

export default TableTrainers
