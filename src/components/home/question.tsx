import React, { useContext, useState } from 'react'
import { Empty, Pagination, Space } from 'antd'
import { DataContext } from '../../store/data'
import { filterQuestions } from '../../store/util'

import type { Question } from '../../store/data.d'
import questions from '../../../build/question.json'
import QuestionItem from './question-item'

const QuestionComponent = () => {
  const { state } = useContext(DataContext)
  const filteredQuestions = filterQuestions(questions, state)
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
        return (
          <QuestionItem
            {...question}
            key={index}
            index={(page - 1) * pageSize + index}
            isShowAnswer={!!state.isShowAnswer}
          />)
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
