import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Edit, Trash2, Plus } from 'lucide-react'
import { ITrainer, ITrainingSessions } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function TableTrainingSessions() {
  const [sessions, setSessions] = useState<ITrainingSessions[]>()
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null)

  const router = useRouter()
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

  const createTrainingSession = () => {}

  const handleDelete = (id: number | null) => {
    console.log(`Deleting session ${id}`)
  }

  const handleEdit = (id: number | null) => {
    if (id) {
      router.push(`trainers/training-session/edit/${id}`)
    } else {
      console.log(`No detailed info available for trainer: ${id}`)
    }
  }

  const handleViewTrainer = (trainer: ITrainer | string | null) => {
    if (typeof trainer === 'object' && trainer !== null) {
      setSelectedTrainer(trainer)
      console.log(selectedTrainer)
    } else {
      console.log(`No detailed info available for trainer: ${trainer}`)
    }
  }

  return (
    <div className="container mx-auto py-10">
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => createTrainingSession()}
              >
                <Plus className="h-4 w-4" color="green" />
                <span className="sr-only">Edit</span>
              </Button>
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(item?.id ?? null)}
                  >
                    <Edit className="h-4 w-4" color="blue" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item?.id ?? null)}
                  >
                    <Trash2 className="h-4 w-4" color="red" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableTrainingSessions
