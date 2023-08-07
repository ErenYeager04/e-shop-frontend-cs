import { useDispatch } from 'react-redux'
import { deleteUser } from '../store/userSlice'

export const useLogout = () => {
  const dispatch = useDispatch()


  const logout = () => {
    // remove user from the storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch(deleteUser())
  }

  return {logout}
}