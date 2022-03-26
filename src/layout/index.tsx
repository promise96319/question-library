import React, { useReducer } from 'react'
import { BackTop, Breadcrumb, Button, Empty, Layout, Menu, Select } from 'antd'

import { DataContext, dataReducer, dataState } from '../store/data'
import { findActiveCatetory } from '../store/util'
import type { Catalogue } from '../store/data.d'
import data from '../../build/data.json'
import gradesArray from '../../build/grades.json'
import styles from './index.module.scss'

const grades = (() => {
  const result = {}
  gradesArray.forEach((item) => {
    result[item.value] = item.label
  })
  return result
})()

const { Content, Sider, Header } = Layout
const { SubMenu } = Menu
const { Option } = Select

const BasicLayout = (props: any) => {
  const [state, dispatch] = useReducer(dataReducer, dataState)

  const menus = findActiveCatetory(data, state.id)

  const breadcrumbs = state.id?.split('__').map((id: string, index: number) => {
    if (index === 0)
      return grades[id]
    return id
  })

  const handleChange = (key: string) => {
    dispatch({ type: 'SET_FILTER_CONDITION', payload: { id: key } })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTER_CONDITION', payload: {} })
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    handleChange(key)
  }

  const handleTitleClick = ({ key }: any) => {
    handleChange(key)
  }

  const renderMenu = (data?: Catalogue[]) => {
    if (!data || data.length === 0)
      return null

    return data.map((item: Catalogue) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.id} title={item.name} onTitleClick={handleTitleClick}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.id}>{item.name} </Menu.Item>
    })
  }

  return (
    <Layout style={{ height: '100%', overflow: 'scroll' }}>
      <DataContext.Provider value={{ state, dispatch }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          style={{ height: '100%', overflow: 'scroll' }}
        >
          <div className={styles.select}>
            <Select defaultValue="7s" style={{ width: 180 }} onChange={handleChange} >
              {
                gradesArray.map((grade) => {
                  return <Option key={grade.value} value={grade.value}>{grade.label}</Option>
                })
              }
            </Select>
          </div>

          <Menu theme="light" mode="inline" onClick={handleMenuClick} style={{ paddingBottom: '100px' }}>
            {menus && menus.length > 0 ? renderMenu(menus) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有相关课程"/>}
          </Menu>
        </Sider>
        <Layout style={{ height: '100%', overflow: 'scroll' }}>
          <Header className={styles.breadcrumb}>
            <Breadcrumb className={styles.ellipsis}>
              {breadcrumbs?.map((breadcrumb, index) => (
                <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <Button onClick={handleReset}>重置筛选项</Button>
          </Header>
          <Content style={{ padding: '0 20px 20px' }}>
            {props.children}
            <BackTop />
          </Content>
        </Layout>
      </DataContext.Provider>
    </Layout>
  )
}

export default BasicLayout
