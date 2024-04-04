import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom/cjs/react-router-dom.min';
import SignupPage from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './Store/Context';
import Home from './Pages/Home';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './Store/PostContext';
import Viewmorepage from './Pages/Viewmore'
import Productviewpage from './Pages/Productview';
import Editpostpage from './Pages/Editpost';

function App() {
  const {setuser} =useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setuser(user)
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Route  path='/home'>
        <Home />
        </Route>
        <Route path='/signup'>
        <SignupPage />
        </Route>
        <Route exact path='/'>
        <Login/>
        </Route>
        <Route path='/create'>
        <CreatePage/>
        </Route>
        <Route path='/viewPost'>
        <ViewPost/>
        </Route>
        <Route path='/viewmore'>
          <Viewmorepage/>
        </Route>
        <Route path='/productview'>
          <Productviewpage/>
        </Route>
        <Route path='/editpost/:id'>
          <Editpostpage/>
        </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
