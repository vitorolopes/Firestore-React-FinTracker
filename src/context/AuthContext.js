import { createContext, useReducer } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
//! HERE 1
    case "LOGIN":
      return {...state, user: action.payload}

    default:
      return state
  }
}

export const AuthContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })
  //! HERE 2
  console.log("AuthContext state TEST:", state);

  return(
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}