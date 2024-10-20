'use client'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import UserInfo from './userInfo'
import UserClasses from './userClasses'

export default function MyAccount() {
  const [info, setInfo] = useState<FetchUserAttributesOutput | null>(null)

  const { user } = useAuthenticator((context) => [context.user])

  const { route } = useAuthenticator((context) => [context.route])

  const getDataUser = async () => {
    const data = await fetchUserAttributes()
    setInfo(data)
  }

  useEffect(() => {
    getDataUser()
  }, [user])

  return route === 'authenticated' ? (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex flex-col m-10 gap-4 gap-y-2 ">
        <header className="font-protest text-3xl flex flex-row justify-center w-[80%] self-center border border-white rounded-sm  bg-black text-white p-3 shadow-lg">
          <h3>Your Profile</h3>
        </header>
        {info ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="grid grid-cols-1  md:grid-cols-2 w-[80%] min-h-48 gap-4">
              <UserInfo user={info}></UserInfo>
              <section className="bg-neutral-50 font-thin flex flex-col py-16 px-4  gap-2 border-[1px] rounded-sm border-solid border-black shadow-md w-full min-h-48 ">
                <header>
                  <h3>Your Subscription</h3>
                </header>
              </section>
            </div>
            <UserClasses></UserClasses>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Authenticator>
  ) : (
    <div className="pt-24">
      <Authenticator
        signUpAttributes={['name', 'family_name', 'phone_number']}
      />
    </div>
  )
}
