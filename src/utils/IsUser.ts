import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from 'aws-amplify/auth'

export interface IIsUser {
  sub?: boolean
  user: boolean
  userAttributes: null | FetchUserAttributesOutput
}

const IsUser = async () => {
  const data: IIsUser = {
    user: false,
    sub: false,
    userAttributes: null,
  }

  const user = await fetchUserAttributes()

  if (user) {
    data.user = true
    data.userAttributes = user
  }

  //verificar en bd que sea sub

  return data
}

export { IsUser }
