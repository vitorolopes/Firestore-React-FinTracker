import { useState, useEffect } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => { 

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const { dispatch } = useAuthContext()  

  const logout = async () => { 
    setError(null)
    setIsLoading(true)
// sign the user out
    try {
      await projectAuth.signOut()
      dispatch({ type: "LOGOUT" })
//  update state
    if(!isCancelled){
      setIsLoading(false)
      setError(null)
    }

    } catch (err) {
      if(!isCancelled){
        console.log(err.message);
        setError(err.message)
        setIsLoading(false)
      }

    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
  
  return {logout, error, isLoading}
}