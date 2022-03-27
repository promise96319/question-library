export interface Catalogue {
  id: string
  name?: string
  children?: Catalogue[]
}

export interface Answer {
  isAnswerShow?: boolean
  answer?: TextParagraph[]
  answerDescription?: TextParagraph[]
}

export interface Question extends Answer {
  id?: string

  grade?: string
  source?: string
  questionType?: string
  time?: string
  province?: string
  author?: string

  question: string | TextParagraph[]
  options?: string[]

  createAt?: string
  level?: number
}

export interface FilterCondition extends Partial<Question> {
  searchValue?: string
}
