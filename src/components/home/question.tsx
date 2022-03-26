import React, { useContext, useState } from 'react'
import { Space } from 'antd'
import { DataContext } from '../../store/data'
import { filterQuestions } from '../../store/util'

import type { Question, QuestionParagraph } from '../../store/data.d'
import questions from '../../../build/question.json'
import styles from './question.module.scss'

interface QuestionItemProps extends Question {
  key: string | number
  index: number
  children?: React.ReactNode
}
const QuestionItem = (props: QuestionItemProps) => {
  const [isShowAnswer, setShowAnswer] = useState(false)

  const renderHeader = () => {
    const keys = ['time', 'province', 'grade', 'source', 'author']
    return (
      <Space>
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
      question.map((item: QuestionParagraph, idx: number) => {
        const { text = '', tag = 'p', indent = 0 } = item
        const eleProps = {
          key: idx,
          style: {
            'margin-left': `${indent}px`,
          },
        }
        const children = idx === 0 ? <span className={styles.title} onClick={onClick}>{index + 1}.  {text}</span> : text
        const ele = React.createElement(tag, eleProps, children)
        return ele
      })
    )
  }

  const renderOption = () => {
    const options = props.options
    if (!options || options.length === 0)
      return null

    return (
      <Space size="large">
        {options.map((item: string, index: number) => (
          <span key={index}>
            {item}
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
    return (
      <div></div>
    )
  }

  return (
    <Space direction="vertical" size="large" className={styles.main}>
      {renderHeader()}
      {renderContent()}
      {renderAnswer()}
      {renderFooter()}
    </Space>
  )
}

const QuestionComponent = () => {
  const filterCondition = useContext(DataContext)
  const filteredQuestions = filterQuestions(questions, filterCondition.state)

  return (
    <>
      {filteredQuestions.map((question: Question, index: number) => {
        return <QuestionItem {...question} key={index} index={index}/>
      })}
    </>
  )
}

export default QuestionComponent
