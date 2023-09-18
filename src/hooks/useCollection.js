import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"
                                                //! HERE 1
export const useCollection = (collection, _query, _orderBy) => { 
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const query = useRef(_query).current
//! HERE 2
  const orderBy = useRef(_orderBy).current

  useEffect(() => {                                                      
    let ref = projectFirestore.collection(collection)
    if(query){
      ref = ref.where(...query)
    }
//! HERE 4
    if(orderBy){
      ref = ref.orderBy(...orderBy) 
    }

    const unsubscribe = ref.onSnapshot( (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      // update state 
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error);
      setError("Could not fetch the data")
    })

    // unsubscribe on unmount
    return () => unsubscribe()
                         //! HERE 3
  }, [collection, query, orderBy ])
  
  return {documents, error}
}