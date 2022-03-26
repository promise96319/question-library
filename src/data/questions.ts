interface Question {
  grade?: string
  unit?: string
  course?: string
  point?: string

  source?: string
  questionType?: string
  time?: string
  province?: string
  author?: string
  answer?: string | number
  answerDescription?: string
  isShowAnswer?: boolean
  createAt?: string
  level?: number
}

export const questionList: Question[] = [
  {
    grade: '七上',
    questionType: '中考真题',
    time: '2020',
    province: '上海',
    source: '阶段练习',
    author: 'silence',
  },
  {
    grade: '七上',
    questionType: '中考真题',
    time: '2020',
    province: '上海',
    source: '阶段练习',
    author: 'silence',
  }, {
    grade: '七上',
    questionType: '中考真题',
    time: '2020',
    province: '上海',
    source: '阶段练习',
    author: 'silence',
  },
]
