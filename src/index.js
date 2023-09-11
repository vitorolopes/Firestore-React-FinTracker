import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//! HERE 1
import { AuthContext } from './context/AuthContext';


ReactDOM.render(
  <React.StrictMode>
  {/* //! HERE 2 */}
    <AuthContext>
       <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById('root')
);
