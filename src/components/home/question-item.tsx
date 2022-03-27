import React, { useEffect, useState } from 'react'
import { Space } from 'antd'

import type { Question, QuestionParagraph } from '../../store/data.d'
import styles from './question-item.module.scss'

interface QuestionItemProps extends Question {
  // 序号
  index: number
  children?: React.ReactNode
  // 是否显示回答
  isAnswerShow?: boolean
}

const QuestionItem = (props: QuestionItemProps) => {
  const [isShowAnswer, setShowAnswer] = useState(!!props.isAnswerShow)

  useEffect(() => {
    setShowAnswer(!!props.isAnswerShow)
  }, [props.isAnswerShow])

  const renderHeader = () => {
    const keys = ['time', 'province', 'grade', 'source', 'author']
    return (
      <Space className={styles.header} wrap>
        {keys.map((key: string, index: number) => props[key] && (
          <Space key={index}>
            <span>
              {props[key]}
            </span>
            <span>
              {index !== keys.length - 1 && ' • '}
            </span>
          </Space>
        ))}
      </Space>
    )
  }

  const renderQuestion = () => {
    const { question, index } = props
    const onClick = () => setShowAnswer(!isShowAnswer)
    if (typeof question === 'string')
      return <h2 className={styles.title} onClick={onClick}>{index + 1}.  {question}</h2>

    return (
      <div onClick={onClick}>
        {
          question.map((item: QuestionParagraph, idx: number) => {
            const { text = '', tag = 'p', indent = 0 } = item
            const eleProps = {
              key: idx,
              style: {
                marginLeft: `${indent * 10}px`,
              },
              className: tag === 'h2' ? styles.title : '',
            }

            const children = idx === 0 ? `${index + 1}.  ${text}` : text
            const ele = React.createElement(tag, eleProps, children)
            return ele
          })
        }
      </div>
    )
  }

  const renderOption = () => {
    const options = props.options
    if (!options || options.length === 0)
      return null

    const prefix = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    return (
      <Space size="large" wrap={true}>
        {options.map((item: string, index: number) => (
          <span key={index}>
            {prefix[index]}. {item}
          </span>
        ))}
      </Space>
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
    return isShowAnswer && (
      <Space direction="vertical" className={styles.answer}>
        <div className="result"><span className={styles.answerLabel}>正确答案：</span>{answer}</div>
        {answerDescription && <div className="description"><span className={styles.answerLabel}>答案讲解：</span>{answerDescription}</div>}
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
