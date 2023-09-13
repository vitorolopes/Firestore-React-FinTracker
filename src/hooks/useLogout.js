import { useState, useEffect } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => { 

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
//! HERE 1
  const [isCancelled, setIsCancelled] = useState(false)

  const { dispatch } = useAuthContext()  

  const logout = async () => { 
    setError(null)
    setIsLoading(true)
// sign the user out
    try {
      await projectAuth.signOut()
      dispatch({ type: "LOGOUT" })

//! HERE 3
      // setIsLoading(false)
      // setError(null)
//  update state
    if(!isCancelled){
      setIsLoading(false)
      setError(null)
    }

    } catch (err) {
//! HERE 4
      // console.log(err.message);
      // setError(err.message)
      // setIsLoading(false)
      if(!isCancelled){
        console.log(err.message);
        setError(err.message)
        setIsLoading(false)
      }

    }
  }
//! HERE 2
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
  
  return {logout, error, isLoading}
}