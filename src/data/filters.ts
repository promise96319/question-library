export const enum Grade {
  SevenUp = '七上',
  SevenDown = '七下',
  EightUp = '八上',
  EightDown = '八下',
  NineUp = '九上',
  NineDown = '九下',
}

export const enum Source {
  All = '全部',
  Practice = '阶段练习',
  Exam = '中考真题',
}

export const enum QuestionType {
  All = '全部',
  Single = '单选题',
  Answer = '简答题',
}

export const enum AnswerQuestionType {
  All = '全部',
  Situation = '情景分析题',
  Material = '材料说明题',
  Activity = '活动探究题',
}

// 时间
export const timelist = [2019, 2020]

// 省份
export const provinceList = ['北京', '上海']

// 作者
export const authorList = ['']

// 年级
export const gradeList = [
  Grade.SevenUp,
  Grade.SevenDown,
  Grade.EightUp,
  Grade.EightDown,
  Grade.NineUp,
  Grade.NineDown,
]

// 类型
export const questionTypeList = [
  QuestionType.All,
  QuestionType.Single,
  QuestionType.Answer,
]

// 简答题类型
export const answerQuestionTypeList = [
  AnswerQuestionType.All,
  AnswerQuestionType.Situation,
  AnswerQuestionType.Material,
  AnswerQuestionType.Activity,
]

// 来源
export const sourceList = [
  Source.All,
  Source.Practice,
  Source.Exam,
]
