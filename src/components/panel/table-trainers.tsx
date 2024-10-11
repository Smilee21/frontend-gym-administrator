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
import { ITrainer } from '@/interfaces/training-sessions'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function TableTrainers() {
  const [trainer, setTrainer] = useState<ITrainer[]>()

  const router = useRouter()
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

  const createTrainer = () => {
    router.push('/trainers/create')
  }

  const handleDelete = (id: number | null) => {
    console.log(`Deleting session ${id}`)
  }

  const handleEdit = (id: number | null) => {
    if (id) {
      router.push(`trainers/edit/${id}`)
    } else {
      console.log(`No detailed info available for trainer: ${id}`)
    }
  }

  return (
    <div className="container mx-auto">
      <header className="flex justify-center mb-7 font-mono text-3xl">
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => createTrainer()}
              >
                <Plus className="h-4 w-4" color="green" />
                <span className="sr-only">Edit</span>
              </Button>
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

export default TableTrainers
