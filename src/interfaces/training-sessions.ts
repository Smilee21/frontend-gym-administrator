export interface ITrainingSessions {
  id: number
  createdAt: Date
  updateAt: Date
  day: string
  hour: string
  spaces: number
  duration: string
  trainer: ITrainer
}

export interface ITrainer {
  id: number
  createdAt: Date
  updateAt: Date
  name: string
  specialty: string
  contactInfo: string
}
