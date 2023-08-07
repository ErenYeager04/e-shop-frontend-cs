import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddUserHook } from './AddUserHook'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  //For redirecting
  const navigate = useNavigate()
  // To decode token and get data from it
  const { userHook } = AddUserHook()
  
  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true)
    setError(null)
     
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/User/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      credentials: 'include',
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    if (!response.ok) {
      const error = await response.text()
      setIsLoading(false)
      setError(error)
    }
    
    if (response.ok) {
      const token = await response.text()
      userHook(token)
      setIsLoading(false)
      navigate('/')
    }
  }

  return { signup, isLoading, error }
}