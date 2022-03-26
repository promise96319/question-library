import React from 'react'
import Filter from '../components/home/filter'
import Search from '../components/home/search'
import Layout from '../layout'
import Question from '../components/home/question'

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Filter></Filter>
      <Search></Search>
      <Question></Question>
    </Layout>
  )
}

export default HomePage
