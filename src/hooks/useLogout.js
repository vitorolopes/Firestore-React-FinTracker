import { useState } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';


export const useLogout = () => { 

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuthContext()  

  const logout = async () => { 
    setError(null)
    setIsLoading(true)
// sign the user out
    try {
      await projectAuth.signOut()
      dispatch({ type: "LOGOUT" })
      // We don't need to pass in a payload here because we 
      // don't need to set the user to be anything other than 
      // null.If they log out, the user becomes null, right?
      setIsLoading(false)
      setError(null)
    } catch (err) {
      console.log(err.message);
      setError(err.message)
      setIsLoading(false)
    }

  }
  return {logout, error, isLoading}
}