
import type { Catalogue, FilterCondition, Question } from './data.d'
export const DEFAULT_GRADE = '7s'
export const findActiveCatetory = (catalogue: Catalogue[], activeCategoryId: string = DEFAULT_GRADE) => {
  return catalogue.find(item => activeCategoryId.startsWith(item.id))?.children
}

const isIncluded = (config?: string, target?: string) => {
  if (!config || !target) return true
  const items = config.split('$$')
  return items.includes(target)
}

export const filterQuestions = (questions: Question[], filterCondition: FilterCondition) => {
  const {
    id = DEFAULT_GRADE,
    source,
    questionType,
    time,
    province,
    author,
  } = filterCondition
  return questions.filter((question) => {
    return (
      question.id?.startsWith(id)
          && isIncluded(question.source, source)
          && isIncluded(question.questionType, questionType)
          && isIncluded(question.time, time)
          && isIncluded(question.province, province)
          && isIncluded(question.author, author)
    )
  })
}
