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

import { Authenticator } from '@aws-amplify/ui-react'
import { useForm } from 'react-hook-form'
import { createTrainer } from '../trainer.api'
import { useRouter } from 'next/navigation'

export default function CreateTrainer() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    createTrainer(data)
  })

  const handleBack = () => {
    router.back()
  }

  return (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex justify-center mb-12">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Create Trainer</CardTitle>
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
