import React, { useReducer } from 'react'
import { Empty, Layout, Menu, Select, Space } from 'antd'

import { DataContext, dataReducer, dataState } from '../store/data'
import { findActiveCatetory } from '../store/util'
import type { Catalogue } from '../store/data.d'
import data from '../../build/data.json'
import styles from './index.module.scss'

const { Content, Sider } = Layout
const { SubMenu } = Menu
const { Option } = Select

const BasicLayout = (props: any) => {
  const [state, dispatch] = useReducer(dataReducer, dataState)

  const menus = findActiveCatetory(data, state.id)

  const handleChange = (key: string) => {
    dispatch({ type: 'SET_FILTER_CONDITION', payload: { id: key } })
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    handleChange(key)
  }

  const renderMenu = (data?: Catalogue[]) => {
    if (!data || data.length === 0)
      return null

    return data.map((item: Catalogue) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.id} title={item.name}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.id}>{item.name} </Menu.Item>
    })
  }

  return (
    <Layout style={{ height: '100%' }}>
      <DataContext.Provider value={{ state, dispatch }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
        >
          <div className={styles.select}>
            <Select defaultValue="7s" style={{ width: 180 }} onChange={handleChange} >
              <Option value="7s">七年级上册</Option>
              <Option value="7x">七年级下册</Option>
              <Option value="8s">八年级上册</Option>
              <Option value="8x">八年级下册</Option>
              <Option value="9s">九年级上册</Option>
              <Option value="9x">九年级下册</Option>
            </Select>
          </div>

          <Menu theme="light" mode="inline" onClick={handleMenuClick}>
            {menus && menus.length > 0 ? renderMenu(menus) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </Menu>
        </Sider>
        <Layout style={{ height: '100%', overflow: 'scroll' }}>
          <Content style={{ margin: '24px 16px 0' }}>
            {props.children}
          </Content>
        </Layout>
      </DataContext.Provider>
    </Layout>
  )
}

export default BasicLayout
