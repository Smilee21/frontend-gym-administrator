import { createServerRunner } from '@aws-amplify/adapter-nextjs'
// import { config } from '@/config/amplify-auth'

const config = {
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  oauth: {},
}

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
})
