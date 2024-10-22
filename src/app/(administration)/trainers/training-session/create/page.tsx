'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ITrainer, TrainingSessionForm } from '@/interfaces/training-sessions'
import { Authenticator } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createTrainingSession } from '../../training-session.api'
import { useRouter } from 'next/navigation'
import { fetchAuthSession } from 'aws-amplify/auth'
import { addDayOfWeek } from '@/lib/utils'

export default function CreateTrainingSession({
  params,
}: {
  params: { id: string }
}) {
  const [trainers, setTrainers] = useState<ITrainer[] | null>(null)
  const { register, handleSubmit, setValue } = useForm()
  const router = useRouter()

  const getTrainers = async () => {
    const token = await fetchAuthSession()
    const idToken = token.tokens?.idToken
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_TRAINERS}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      const result: ITrainer[] = await response.json()
      setTrainers(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getTrainers()
  }, [params.id])

  const onSubmit = handleSubmit((data) => {
    const typedData: TrainingSessionForm = {
      dateOfClass: data.dateOfClass,
      hour: data.hour,
      duration: data.duration,
      spaces: data.spaces,
      trainerId: data.trainerId,
    }

    const sendData = addDayOfWeek(typedData)

    console.log('esta es la cosa que se envia', sendData)

    createTrainingSession(sendData)
  })

  const handleBack = () => {
    router.back()
  }

  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="container mx-auto mt-20 w-[80%] flex flex-col gap-4 justify-center">
        <header className="font-protest text-3xl flex flex-row justify-center w-[90%] self-center border border-white rounded-sm  bg-black text-white p-3 shadow-lg">
          <h2>Training Sessions</h2>
        </header>
        <Card className="w-1/2 self-center">
          <CardHeader>
            <CardTitle>Create Training Session</CardTitle>
            <CardDescription>Change fields</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} id="form-edit">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="dateOfClass">Day</Label>
                  <Input
                    type="date"
                    id="dateOfClass"
                    placeholder="Name of your project"
                    {...register('dateOfClass')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="hour">Hour</Label>
                  <Input
                    type="time"
                    id="hour"
                    {...register('hour')}
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    type="time"
                    id="duration"
                    {...register('duration')}
                    placeholder="Name of your project"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="spaces">Spaces</Label>
                  <Input
                    id="spaces"
                    type="number"
                    {...register('spaces')}
                    placeholder="Name of your project"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="trainerId">Trainer</Label>
                  <Select
                    onValueChange={(value) => setValue('trainerId', value)}
                  >
                    <SelectTrigger id="trainerId">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {trainers?.map((trainer) => (
                        <SelectItem
                          key={trainer?.id?.toLocaleString()}
                          value={trainer?.id?.toLocaleString() ?? ''}
                        >
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button type="submit" form="form-edit">
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Authenticator>
  )
}
