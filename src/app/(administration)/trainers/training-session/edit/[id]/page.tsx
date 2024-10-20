'use client'
/* eslint-disable react-hooks/exhaustive-deps */
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

import { ITrainer, ITrainingSessions } from '@/interfaces/training-sessions'
import { Authenticator } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { editTrainingSession } from '../../../training-session.api'
import { useRouter } from 'next/navigation'
import { fetchAuthSession } from 'aws-amplify/auth'

export default function EditTrainingSession({
  params,
}: {
  params: { id: string }
}) {
  const [session, setSession] = useState<ITrainingSessions | null>(null)
  const [trainers, setTrainers] = useState<ITrainer[] | null>(null)
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: async () => await getTrainingSession(),
  })

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

  const getTrainingSession = async () => {
    const URL = process.env.NEXT_PUBLIC_URL
    const token = await fetchAuthSession()
    const idToken = token.tokens?.idToken

    try {
      const response = await fetch(`${URL}/` + params.id, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      const result: ITrainingSessions = await response.json()
      setSession(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getTrainingSession()
    getTrainers()
  }, [params.id])

  const onSubmit = handleSubmit((data) => {
    editTrainingSession(params.id, data)
  })

  const handleBack = () => {
    router.back()
  }

  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex justify-center mt-32">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Edit Training Session</CardTitle>
            <CardDescription>Change fields</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} id="form-edit">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="day">Day</Label>
                  <Input
                    id="day"
                    placeholder="Name of your project"
                    {...register('day')}
                    defaultValue={session?.day}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="hour">Hour</Label>
                  <Input
                    id="hour"
                    {...register('hour')}
                    placeholder="Name of your project"
                    defaultValue={session?.hour}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    {...register('duration')}
                    placeholder="Name of your project"
                    defaultValue={session?.duration}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="spaces">Spaces</Label>
                  <Input
                    id="spaces"
                    type="number"
                    {...register('spaces')}
                    placeholder="Name of your project"
                    defaultValue={session?.spaces}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="trainerId">Trainer</Label>
                  <Select
                    onValueChange={(value) => setValue('trainerId', value)}
                    defaultValue={session?.trainer?.id?.toLocaleString()}
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
