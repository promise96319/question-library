export interface Catalogue {
  id: string
  name?: string
  children?: Catalogue[]
}

export interface Question {
  key: string

  source?: string
  questionType?: string
  time?: string
  province?: string
  author?: string

  answer?: string | number
  answerDescription?: string

  createAt?: string
  level?: number
}

export interface FilterCondition extends Partial<Question> {}
