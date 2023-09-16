import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
                    //! HERE 1
  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
    
        {authIsReady && (

          <BrowserRouter>

            <Navbar/>

            <Switch>
               <Route exact path="/">
               {/* //! HERE 2a */}
                {!user && <Redirect to="/login" />}
                {user &&  <Home/>}
               
               </Route>

               <Route path="/login">
                {/* //! HERE 2b */}
                 {user && <Redirect to="/" />}
                 {!user &&  <Login/>}
               
               </Route>

               <Route path="/signup">
                  {/* //! HERE 2c */}
                   {user && <Redirect to="/"/>}
                   {!user && <Signup/>}
                  
               </Route>
            </Switch>
            
          </BrowserRouter>
        )}

    </div>
  );
}

export default App
