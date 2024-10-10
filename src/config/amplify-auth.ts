import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: `${process.env.NEXT_PUBLIC_USER_POOL_ID}`,
      userPoolClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
      identityPoolId: `${process.env.NEXT_PUBLIC_IDENTITY_POOL_ID}`,

      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
    },
  },
})