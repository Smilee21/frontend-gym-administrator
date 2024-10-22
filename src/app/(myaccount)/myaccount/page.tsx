'use client'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { useCallback, useEffect, useState } from 'react'
import UserInfo from './userInfo'
import UserClasses from '@/components/myaccount/userClasses'
import UserSubscription from './userSubscription'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function MyAccount() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [info, setInfo] = useState<FetchUserAttributesOutput | null>(null)
  const [params, setParams] = useState('')

  const { user } = useAuthenticator((context) => [context.user])
  const { route } = useAuthenticator((context) => [context.route])

  const getDataUser = useCallback(async () => {
    if (user) {
      try {
        const data = await fetchUserAttributes()
        setInfo(data)
      } catch (error) {
        console.error('Error fetching user attributes:', error)
      }
    }
  }, [user])

  useEffect(() => {
    getDataUser()
  }, [getDataUser])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (info?.email) {
      params.set('client-email', info.email)
      setParams(params.toString())
    }
  }, [searchParams, user, info])

  useEffect(() => {
    if (params) {
      replace(`${pathname}?${params}`)
    }
  }, [params, pathname, replace])

  return route === 'authenticated' ? (
    <div className="flex flex-col m-10 gap-4 gap-y-2 ">
      <header className="font-protest text-3xl flex flex-row justify-center w-[80%] self-center border border-white rounded-sm bg-black text-white p-3 shadow-lg">
        <h3>Your Profile</h3>
      </header>
      {info ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] min-h-48 gap-4">
            <UserInfo user={info}></UserInfo>
            <UserSubscription user={info}></UserSubscription>
          </div>
          <UserClasses></UserClasses>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  ) : (
    <div className="pt-24">
      <Authenticator
        signUpAttributes={['name', 'family_name', 'phone_number']}
      />
    </div>
  )
}
