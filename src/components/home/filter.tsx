import React, { useContext } from 'react'
import { Space, Tag } from 'antd'
import { authorList, provinceList, questionTypeList, sourceList, timelist } from '../../store/filter'
import { DataContext } from '../../store/data'
import styles from './filter.module.scss'

const { CheckableTag } = Tag

interface FilterOption {
  id: string
  label: string
  value: Set<string>
}

const filterOptions: FilterOption[] = [
  {
    id: 'source',
    label: '来源',
    value: sourceList,
  },
  {
    id: 'questionType',
    label: '题型',
    value: questionTypeList,
  },
  {
    id: 'time',
    label: '时间',
    value: timelist,
  },
  {
    id: 'province',
    label: '地区',
    value: provinceList,
  },
  {
    id: 'author',
    label: '原创',
    value: authorList,
  },
]

const FilterItem = (props: FilterOption) => {
  const { state, dispatch } = useContext(DataContext)
  const { label, value, id } = props
  const target = state[id]

  const handleChange = (value: string | number, checked: boolean) => {
    if (checked) {
      dispatch({
        type: 'SET_FILTER_CONDITION',
        payload: {
          [id]: value,
        },
      })
    }
  }

  return (
    <Space className={styles.filterItem}>
      <label>{label}：</label>
      <Space align="center">
        {[...value].map((value: string | number, index: number) => {
          return (
            <CheckableTag
              key={index}
              checked={target === value}
              onChange={(checked) => {
                handleChange(value, checked)
              }}>
              {value}
            </CheckableTag>
          )
        })}
      </Space>
    </Space>
  )
}

const Filter = () => {
  return (
    <div className={styles.filter}>
      {filterOptions.map((option: FilterOption) => {
        return <FilterItem {...option} key={option.id}></FilterItem>
      })}
    </div>
  )
}

export default Filter
