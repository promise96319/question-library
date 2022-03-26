import React from 'react'
import { Button, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import accounts from '../../../build/account.json'
import styles from './login.module.scss'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const login = () => {
    if (accounts[username] === password) {
      localStorage.setItem('mi_login', `${username}&&&${password}`)
      message.success('登录成功！')
      window.location.href = '/'
    }

    else { message.error('用户名或密码错误') }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>试题库</h2>
      <Input
        allowClear
        size="large"
        placeholder="large size"
        prefix={<UserOutlined />}
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <Input.Password
        allowClear
        prefix={<LockOutlined />}
        size="large"
        placeholder="input password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button
        size="large"
        block
        type="primary"
        onClick={login}
      >
          登录
      </Button>
    </div>
  )
}

export default Login
