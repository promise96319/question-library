import React from 'react'
import { Space } from 'antd'
import { authorList, gradeList, provinceList, questionTypeList, sourceList, timelist } from '../../data/index'
import styles from './filter.module.scss'

interface FilterOption {
  key: string
  label: string
  value: any[]
}

const filterOptions: FilterOption[] = [
  {
    key: 'grade',
    label: '年级',
    value: gradeList,
  },
  {
    key: 'source',
    label: '来源',
    value: sourceList,
  },
  {
    key: 'questionType',
    label: '题型',
    value: questionTypeList,
  },
  {
    key: 'time',
    label: '时间',
    value: timelist,
  },
  {
    key: 'province',
    label: '地区',
    value: provinceList,
  },
  {
    key: 'author',
    label: '原创',
    value: authorList,
  },
]

const FilterItem = (props: any) => {
  const { label, value } = props

  return (
    <Space size="large" className={styles['filter-item']}>
      <label>{label}：</label>
      <Space align='center'>
        {value.map((value: string | number) => {
          return <span key={value}>{value}</span>
        })}
      </Space>
    </Space>
  )
}

const Filter = () => {
  return (
    <div className={styles.filter}>
      {filterOptions.map((option: FilterOption) => {
        return <FilterItem {...option}></FilterItem>
      })}
    </div>
  )
}

export default Filter
