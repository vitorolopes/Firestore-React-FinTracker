import { useState, useEffect } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => { 

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const { dispatch } = useAuthContext()  

  const login = async (email,password) => { 
    setError(null)
    setIsLoading(true)
// sign the user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email,password)
      dispatch({ type: "LOGIN", payload: res.user })
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
  
  return {login, error, isLoading}
}