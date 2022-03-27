import { useEffect, useReducer } from 'react'
import Edit from '../components/edit/index'
import accounts from '../../build/account.json'
import { DataContext, dataReducer, dataState } from '../store/data'

const EditPage = () => {
  const [state, dispatch] = useReducer(dataReducer, dataState)
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
    <DataContext.Provider value={{ state, dispatch }}>
      <Edit></Edit>
    </DataContext.Provider>
  )
}
export default EditPage
