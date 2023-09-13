import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { logout } = useLogout()
//! HERE 1
  const {user} = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
{/* //! HERE 2 */}
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

{/* //! HERE 3 */}
        {user && (
          <>
            <li>Hello {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>Logout</button>
            </li>
          </>
          )}

      </ul>
    </nav>
  )
}

export default Navbar