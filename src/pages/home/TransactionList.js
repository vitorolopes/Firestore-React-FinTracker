import React from 'react'
import styles from './Home.module.css';
import { useFirestore } from '../../hooks/useFirestore';


const TransactionList = ({ transactions }) => {
//! HERE 1
  const {deleteDocument, response} = useFirestore("transactions")
  console.log(response);

  return (
    <ul className={styles.transactions}>
      {transactions.map( transaction => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
{/* //! HERE 2 */}
          <button onClick={()=>deleteDocument(transaction.id)}>x</button>

        </li>
      ))}
    </ul>
  )
}

export default TransactionList