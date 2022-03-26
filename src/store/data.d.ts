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

export interface Answer {
  isShowAnswer?: boolean
  answer?: string
  answerDescription?: string
}

export interface Question extends Answer {
  id?: string

  grade?: string
  source?: string
  questionType?: string
  time?: string
  province?: string
  author?: string

  question: string | QuestionParagraph[]
  options?: string[]

  createAt?: string
  level?: number
}

export interface FilterCondition extends Partial<Question> {
  searchValue?: string
}
