'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import { Authenticator } from '@aws-amplify/ui-react'
import { useForm } from 'react-hook-form'
import { editTrainer } from '../../trainer.api'
import { ITrainer } from '@/interfaces/training-sessions'
import { useRouter } from 'next/navigation'
import { fetchAuthSession } from 'aws-amplify/auth'

export default function EditTrainer({ params }: { params: { id: string } }) {
  const [, setTrainer] = useState<ITrainer | null>({})
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    defaultValues: async () => await fetchData(),
  })

  const handleBack = () => {
    router.back()
  }

  const fetchData = async () => {
    const URL = `${process.env.NEXT_PUBLIC_TRAINERS}`
    const token = await fetchAuthSession()
    const idToken = token.tokens?.idToken

    try {
      const response = await fetch(URL + `/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      const result: ITrainer[] = await response.json()
      const res = result[0]
      setTrainer(res)
      return res
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [params.id])

  const onSubmit = handleSubmit(async (data) => {
    const resul = await editTrainer(params.id, data)
    console.log(resul)
  })

  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex justify-center mb-12">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Edit Trainer</CardTitle>
            <CardDescription>Insert Field</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} id="form-edit">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Trainer Name"
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="duration">Specialty</Label>
                  <Input
                    id="specialty"
                    {...register('specialty')}
                    placeholder="Trainer Specialty"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="contactInfo">Contact Info</Label>
                  <Input
                    id="contactInfo"
                    {...register('contactInfo')}
                    placeholder="Email or Phone"
                  />
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
