import { useEffect } from 'react'
import Edit from '../components/edit/index'
import accounts from '../../build/account.json'

const EditPage = () => {
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
    <Edit></Edit>
  )
}
export default EditPage
