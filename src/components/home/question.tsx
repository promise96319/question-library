import React, { useContext, useEffect, useState } from 'react'
import { Empty, Pagination, Space } from 'antd'
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
  const { state } = useContext(DataContext)
  const [isShowAnswer, setShowAnswer] = useState(state.isAnswerShow)

  useEffect(() => {
    setShowAnswer(state.isAnswerShow)
  }, [state.isAnswerShow])

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
      question.map((item: QuestionParagraph, idx: number) => {
        const { text = '', tag = 'p', indent = 0 } = item
        const eleProps = {
          key: idx,
          style: {
            marginLeft: `${indent}px`,
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

const QuestionComponent = () => {
  const filterCondition = useContext(DataContext)
  const filteredQuestions = filterQuestions(questions, filterCondition.state)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const onShowSizeChange = (current: number, size: number) => {
    setPage(current)
    setPageSize(size)
  }

  const sliceFilterQuestions = filteredQuestions.slice((page - 1) * pageSize, page * pageSize)

  if (sliceFilterQuestions.length === 0) {
    return (
      <Space style={{ width: '100%', height: '300px', justifyContent: 'center' }}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有相关试题"></Empty>
      </Space>
    )
  }

  return (
    <>
      {sliceFilterQuestions.map((question: Question, index: number) => {
        return <QuestionItem {...question} key={index} index={(page - 1) * pageSize + index}/>
      })}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={filteredQuestions.length}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onShowSizeChange}
        style={{ paddingBottom: '100px', textAlign: 'right' }}
      />
    </>
  )
}

export default QuestionComponent
