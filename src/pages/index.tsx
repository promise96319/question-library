import React from 'react'
import Filter from '../components/home/filter'
import Layout from '../layout'
import Question from '../components/home/question'

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Filter></Filter>
      <Question></Question>
    </Layout>
  )
}

export default HomePage
