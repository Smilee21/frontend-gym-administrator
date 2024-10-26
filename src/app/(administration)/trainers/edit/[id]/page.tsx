'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
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
import { useRouter, useSearchParams } from 'next/navigation'

export default function EditTrainer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const trainerId = searchParams.get('id')?.toString()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: searchParams.get('name') || '',
      specialty: searchParams.get('specialty') || '',
      contactInfo: searchParams.get('contact') || '',
    },
  })

  const handleBack = () => {
    router.back()
  }

  const onSubmit = handleSubmit(async (data) => {
    if (trainerId) {
      const resul = await editTrainer(trainerId, data)
      console.log(resul)
    }
  })

  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex justify-center mt-40">
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
