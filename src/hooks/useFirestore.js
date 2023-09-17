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

    default:
      return state
  }

}

export const useFirestore = (collection) => { 
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  // I'm going to call this response because it's going to kind of represent 
  // the response that we get back from Firestore.
  const [isCancelled, setIsCancelled] = useState(false)

  // collection reference
  const ref = projectFirestore.collection(collection)

  // add a document
  const addDocument = (doc) => { 

  }

  const deleteDocument = (id) => { 
    
  }

  useEffect(() => {
    return () => {setIsCancelled(true)}
  }, [])
  
  return {addDocument, deleteDocument, response}

}