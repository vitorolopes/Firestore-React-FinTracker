import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';


const Navbar = () => {
//! HERE 1
  const { logout } = useLogout()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
{/* //! HERE 2 */}
        <li>
          <button className="btn" onClick={logout}>Logout</button>
        </li>

      </ul>
    </nav>
  )
}

export default Navbar