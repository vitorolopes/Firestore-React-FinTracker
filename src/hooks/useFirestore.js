import {useReducer, useEffect, useState} from 'react';
import { projectFirestore } from '../firebase/config';

let initialState = { // we're creating the initial state outside 
  document: null,    // of the hook because we don't need to make
  isLoading: false,  // a new copy of it every time the hook is used.
  error: null,
  success: null
}  

const firestoreReducer = (state, action) => { 
  switch (action.type){
//! HERE 1b
    case "IS_LOADING":
      return { isLoading: true, document: null, success: false, error: null}
//! HERE 2c
    case "ADDED_DOCUMENT":
      return {isLoading: false, document: action.payload, //* no need to "spread" the state
              success: true, error: null} //* since we are updating all state variables
//! HERE 3b
    case "ERROR":
      return {isLoading: false, document: null, success: false, error: action.payload}

    default:
      return state
  }
}

export const useFirestore = (collection) => { 
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)
  // collection reference
  const ref = projectFirestore.collection(collection)
//! HERE 2b
  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => { 
    if(!isCancelled){
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => { 
//! HERE 1a
    dispatch({type: "IS_LOADING"})
//! HERE 2a
    try {
      const addedDocument = await ref.add({doc}) // ref.add(doc) returns to us 
      // a reference to the document that we've just added.
      dispatchIfNotCancelled({type: "ADDED_DOCUMENT", payload: addedDocument})
//! HERE 3a
    } catch (err) {
      dispatchIfNotCancelled({type: "ERROR", payload: err.message})
    }

  }

  const deleteDocument =  (id) => {  // TODO turn this func into async one
    
  }

  useEffect(() => {
    return () => {setIsCancelled(true)}
  }, [])
  
  return {addDocument, deleteDocument, response}

}