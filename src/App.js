import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
//! HERE 1
  const {authIsReady} = useAuthContext()

  return (
    <div className="App">
    
{/* //! HERE 2 */}
        {authIsReady && (

          <BrowserRouter>

            <Navbar/>

            <Switch>
               <Route exact path="/">
                <Home/>
               </Route>
               <Route path="/login">
                <Login/>
               </Route>
               <Route path="/signup">
                <Signup/>
               </Route>
            </Switch>
            
          </BrowserRouter>
        )}

    </div>
  );
}

export default App
