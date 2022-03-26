import question from '../../build/question.json'

export const enum QuestionType {
  Single = '单选题',
}

export const All = '全部'
export const SEPERATOR = '$$'

export const timelist = new Set([All])
export const provinceList = new Set([All])
export const sourceList = new Set([All])
export const authorList = new Set([All])
export const questionTypeList = new Set([All])

const addItem = (list: Set<string>, item: string) => {
  item.split(SEPERATOR).forEach(i => list.add(i))
}

question.forEach((item) => {
  addItem(timelist, item.time)
  addItem(provinceList, item.province)
  addItem(sourceList, item.source)
  addItem(authorList, item.author)
  addItem(questionTypeList, item.questionType)
})
