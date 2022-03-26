
import type { Catalogue, FilterCondition, Question, QuestionParagraph } from './data.d'
import { All } from './filter'
export const DEFAULT_GRADE = '7s'
export const findActiveCatetory = (catalogue: Catalogue[], activeCategoryId: string = DEFAULT_GRADE) => {
  return catalogue.find(item => activeCategoryId.startsWith(item.id))?.children
}

const isIncluded = (config?: string, target?: string) => {
  if (!config || !target || target === All) return true
  const items = config.split('$$')
  return items.includes(target)
}

const isSearched = (questionConfig?: Question, searchValue?: string) => {
  if (!searchValue) return true
  const {
    question, answer, answerDescription, options,
    source,
    questionType,
    time,
    province,
    author,
    grade,
  } = questionConfig || {}

  const isInAnswer = (answer || '').includes(searchValue) || (answerDescription || '').includes(searchValue)
  const isInOptions = (options || []).some((item: string) => item.includes(searchValue))
  const isInQuestion = typeof question === 'string' ? question.includes(searchValue) : question && question.some((item: QuestionParagraph) => item.text && item.text.includes(searchValue))
  const isIncludeSearch = (value?: string, searchValue?: string) => {
    if (!searchValue) return true
    if (!value) return false
    const items = value.split('$$')
    return items.some((item: string) => item.includes(searchValue))
  }
  return isInAnswer
    || isInOptions
    || isInQuestion
    || isIncludeSearch(source, searchValue)
    || isIncludeSearch(questionType, searchValue)
    || isIncludeSearch(time, searchValue)
    || isIncludeSearch(province, searchValue)
    || isIncludeSearch(author, searchValue)
    || isIncludeSearch(grade, searchValue)
}

export const filterQuestions = (questions: Question[], filterCondition: FilterCondition) => {
  const {
    id = DEFAULT_GRADE,
    source,
    questionType,
    time,
    province,
    author,
    searchValue,
  } = filterCondition
  return questions.filter((question) => {
    return (
      question.id?.startsWith(id)
          && isIncluded(question.source, source)
          && isIncluded(question.questionType, questionType)
          && isIncluded(question.time, time)
          && isIncluded(question.province, province)
          && isIncluded(question.author, author)
          && isSearched(question, searchValue)

    )
  })
}
