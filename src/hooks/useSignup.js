import {useState, useEffect} from 'react'
import {projectAuth} from "../firebase/config"
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
      setError(null) // reset the error to null everytime we sign up
      setIsLoading(true)
      try {
        // signup user
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        // console.log(res.user);
        if(!res){
          throw new Error("Could not complete signup")
        }
        // add displayName to user
        await res.user.updateProfile({displayName: displayName})
        // dispatch login action
        dispatch({type: "LOGIN", payload: res.user})
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

  return { error, isLoading, signup}
}

