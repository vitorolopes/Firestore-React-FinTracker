import {useReducer, useEffect, useState} from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = { // we're creating the initial state outside 
  document: null,    // of the hook because we don't need to make
  isLoading: false,  // a new copy of it every time the hook is used.
  error: null,
  success: null
}  

const firestoreReducer = (state, action) => { 
  switch (action.type){
    case "IS_LOADING":
      return { isLoading: true, document: null, success: false, error: null}
    case "ADDED_DOCUMENT":
      return {isLoading: false, document: action.payload, //* no need to "spread" the state
              success: true, error: null} //* since we are updating all state variables
//! HERE 2
    case "DELETED_DOCUMENT":
      return {isLoading: false, document: null, success: true, error: null}

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
  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => { 
    if(!isCancelled){
      dispatch(action)
    }
  }
  // add a document
  const addDocument = async (doc) => { 
    dispatch({type: "IS_LOADING"})
    try {
      const createdAt = timestamp.fromDate(new Date())                                
      const addedDocument = await ref.add({...doc, createdAt: createdAt}) // ref.add(doc) returns to us 
      // a reference to the document that we've just added.
      dispatchIfNotCancelled({type: "ADDED_DOCUMENT", payload: addedDocument})
    } catch (err) {
      dispatchIfNotCancelled({type: "ERROR", payload: err.message})
    }

  }
  // delete a document
  const deleteDocument =  async (id) => {  
//! HERE 1
    dispatch({type: "IS_LOADING"})
    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({type:"DELETED_DOCUMENT"})
    } catch (err) {
      dispatchIfNotCancelled({type: "ERROR", payload: "could not delete"})
    }

  }

  useEffect(() => {
    return () => {setIsCancelled(true)}
  }, [])
  
  return {addDocument, deleteDocument, response}
}