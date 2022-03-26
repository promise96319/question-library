import React, { useContext } from 'react'
import { Input, Space, Switch } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { DataContext } from '../../store/data'
import questions from '../../../build/question.json'
import { filterQuestions } from '../../store/util'
import styles from './search.module.scss'

const SearchComponent = () => {
  const { state, dispatch } = useContext(DataContext)
  const filteredQuestions = filterQuestions(questions, state)

  const onSearch = (e: any) => {
    dispatch({
      type: 'SET_FILTER_CONDITION',
      payload: {
        searchValue: e.target.value,
      },
    })
  }

  const toggleAnswerVisible = (checked: boolean) => {
    dispatch({
      type: 'SET_FILTER_CONDITION',
      payload: {
        isAnswerShow: checked,
      },
    })
  }

  return (
    <div className={styles.search}>
      <Space size="middle">
        <Input
          placeholder="搜索关键字"
          prefix={<SearchOutlined />}
          style={{ width: '240px' }}
          allowClear={true}
          onChange={onSearch}>
        </Input>

        <div>共{filteredQuestions.length}个试题</div>
      </Space>
      <Switch checkedChildren="显示答案" unCheckedChildren="隐藏答案" onChange={toggleAnswerVisible}/>
    </div>
  )
}

export default SearchComponent
