export interface Catalogue {
  id: string
  name?: string
  children?: Catalogue[]
}

export interface QuestionParagraph {
  tag?: string
  text?: string
  indent?: number
}

export interface Question {
  id?: string

  grade?: string
  source?: string
  questionType?: string
  time?: string
  province?: string
  author?: string

  answer?: string
  answerDescription?: string

  question: string | QuestionParagraph[]
  options?: string[]

  createAt?: string
  level?: number
}

export interface FilterCondition extends Partial<Question> {}
