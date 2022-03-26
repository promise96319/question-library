import React, { useEffect } from 'react'
import Filter from '../components/home/filter'
import Search from '../components/home/search'
import Layout from '../layout'
import Question from '../components/home/question'
import accounts from '../../build/account.json'

const HomePage = () => {
  const validateUser = () => {
    const loginData = localStorage && localStorage.getItem('mi_login')
    if (!loginData) {
      window.location.href = '/login'
      return
    }

    const [username, password] = loginData.split('&&&')
    if (!username || !password || accounts[username] !== password)
      window.location.href = '/login'
  }
  useEffect(() => {
    validateUser()
  })

  return (
    <Layout>
      <Filter></Filter>
      <Search></Search>
      <Question></Question>
    </Layout>
  )
}

export default HomePage
