export interface ResponseInscribe {
  response: ResponseClass
  status: number
  options: string
  message: string
  name: string
}

export interface ResponseClass {
  success: boolean
  message: string
}
