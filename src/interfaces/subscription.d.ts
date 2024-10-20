export interface SubscriptionUser {
  id: number
  createdAt: Date
  updateAt: Date
  name: string
  family_name: string
  email: string
  phone: string
  subscription: Subscription
}

export interface Subscription {
  id: number
  createdAt: Date
  updateAt: Date
  plan_type: string
  status: string
  start_date: Date
  end_date: Date
}

export interface RequestSubscriptionUser {
  email: string
  name: string
  family_name: string
  phone: string
  plan_type: string
}
