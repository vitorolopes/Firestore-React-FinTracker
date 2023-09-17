import styles from "./Home.module.css"
import TransactionForm from './TransactionForm';
import {useAuthContext} from '../../hooks/useAuthContext';

const Home = () => {
//! HERE 1
  const {user} = useAuthContext()

  return (
    
    <div className={styles.container}>
      <div className={styles.content}>
        Transaction List
      </div>
      <div className={styles.sidebar}>
                     {/* //! HERE 2 */}
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}

export default Home