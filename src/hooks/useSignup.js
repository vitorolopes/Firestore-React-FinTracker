import {useState} from 'react'
import {projectAuth} from "../firebase/config"


export const useSignup = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

// So Firebase authentication allows us to set a user's displayName.
// Now, we can't just set any property, we can't make them up.
// We can't say, Oh, we also want an age property or a favorite color property.
  const signup = async (email, password, displayName) => {
      setError(null) // reset the erro to null everytime we sign up
      setIsLoading(true)
      try {
        // signup user
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        console.log(res.user);
        if(!res){
          throw new Error("Could not complete signup")
        }
        // add displayName to user
        await res.user.updateProfile({displayName: displayName})
        setIsLoading(false)
        setError(null)
        
      } catch (err) {
        console.log(err);
        setError(err.message)
        setIsLoading(false)
      }
  }

  return { error, isLoading, signup}

}

