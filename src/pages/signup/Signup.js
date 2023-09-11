import styles from "./Signup.module.css"
import {useState} from 'react'
//! HERE 1
import { useSignup } from "../../hooks/useSignup"

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

//! HERE 2
  const {signup, isLoading, error} = useSignup()

  const handleSubmit = (e) => { 
    e.preventDefault()
    //! HERE 3
    // console.log(email, password, displayName);
     signup(email, password, displayName);

  }

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input type="email"
               onChange={(e)=> setEmail(e.target.value)}   
               value={email}
        />
      </label>
      
      <label>
        <span>password:</span>
        <input type="password"
                onChange={(e)=> setPassword(e.target.value)}   
                value={password}
        />
      </label>

      <label>
        <span>display name:</span>
        <input type="text"
                onChange={(e)=> setDisplayName(e.target.value)}   
                value={displayName}
        />
      </label>
{/* //! HERE 4 */}
      {/* <button className="btn">Signup</button> */}
      {!isLoading && <button className="btn">Signup</button>}
      {isLoading && <button className="btn" disabled>loading</button>}
      {error && <p>{error}</p>}

    </form>
  )
}
export default Signup