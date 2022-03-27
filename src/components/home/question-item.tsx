import React, { useEffect, useState } from 'react'
import { Space } from 'antd'

import type { Question } from '../../store/data.d'
import styles from './question-item.module.scss'
import TextParagraphComponent from './text-paragraph'

interface QuestionItemProps extends Question {
  // 序号
  index: number
  children?: React.ReactNode
  // 是否显示回答
  isAnswerShow?: boolean
}

const QuestionItem = (props: QuestionItemProps) => {
  const [isAnswerShow, setShowAnswer] = useState(!!props.isAnswerShow)

  useEffect(() => {
    setShowAnswer(!!props.isAnswerShow)
  }, [props.isAnswerShow])

  const renderHeader = () => {
    const keys = ['time', 'province', 'grade', 'source', 'author']
    let hasDot = false
    return (
      <Space className={styles.header} wrap>
        {keys.map((key: string, index: number) => {
          if (!props[key]) return null
          const item = (
            <Space key={index}>
              {hasDot && <span> • </span>}
              <span>
                {props[key]}
              </span>
            </Space>
          )
          hasDot = true
          return item
        })}
      </Space>
    )
  }

  const renderQuestion = () => {
    const { question, index } = props
    const onClick = () => setShowAnswer(!isAnswerShow)
    if (typeof question === 'string')
      return <h2 className={styles.title} onClick={onClick}>{index + 1}.  {question}</h2>

    return (
      <div onClick={onClick} className={styles.questions}>
        <TextParagraphComponent texts={question} index={index + 1}></TextParagraphComponent>
      </div>
    )
  }

  const renderOption = () => {
    const options = props.options
    if (!options || options.length === 0)
      return null

    const prefix = ['A', 'B', 'C', 'D', 'E', 'F']
    // 控制多少个字母自动换行
    const isWrap = options.reduce((prev, curr) => prev + curr.length, 0) > 40

    return (
      <div className={styles.options}>
        {options.map((item: string, index: number) => (
          <div key={index} style={{ width: isWrap ? '100%' : 'auto' }}>
            {prefix[index]}.  {item}
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div>
        {renderQuestion()}
        {renderOption()}
      </div>
    )
  }

  const renderAnswer = () => {
    const { answer, answerDescription } = props
    const style = {
      fontSize: '14px',
      minHeight: '22px',
      lineHeight: '22px',
      marginBottom: '4px',
      marginTop: '4px',
    }
    return isAnswerShow && (
      <Space direction="vertical" className={styles.answer} size="small">
        {answer && answer.length > 0 && (
          <Space align="start">
            <p style={style} className={styles.answerLabel}>【答案】</p>
            <TextParagraphComponent texts={answer}></TextParagraphComponent>
          </Space>
        )}
        {answerDescription && answerDescription.length > 0 && (
          <Space align="start">
            <p style={style} className={styles.answerLabel}>【分析】</p>
            <TextParagraphComponent texts={answerDescription}></TextParagraphComponent>
          </Space>
        )}
      </Space>
    )
  }

  const renderFooter = () => {
    return null
  }

  return (
    <div className={styles.main}>
      {renderHeader()}
      {renderContent()}
      {renderAnswer()}
      {renderFooter()}
    </div>
  )
}

export default QuestionItem
