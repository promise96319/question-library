import React, { useReducer } from 'react'
import { Layout, Menu, Select } from 'antd'

import { dataReducer, findActiveCatetory, initialDataState } from '../store/data'
import type { Catalogue } from '../store/data.d'
import data from '../../build/data.json'

const { Content, Sider } = Layout
const { SubMenu } = Menu
const { Option } = Select

const BasicLayout = (props: any) => {
  const [state, dispatch] = useReducer(dataReducer, initialDataState)

  const menus = findActiveCatetory(data, state.key)

  const handleChange = (key: string) => {
    dispatch({ type: 'SET_FILTER_CONDITION', payload: { key } })
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
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Option value="7s">七年级上册</Option>
          <Option value="7x">七年级下册</Option>
          <Option value="8s">八年级上册</Option>
          <Option value="8x">八年级下册</Option>
          <Option value="9s">九年级上册</Option>
          <Option value="9x">九年级下册</Option>
        </Select>

        <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
          {renderMenu(menus)}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
