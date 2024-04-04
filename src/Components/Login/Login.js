import React, {useState,useContext} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Login() {
  const {firebase}=useContext(FirebaseContext)
  const history = useHistory()
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const handlelogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/home')
    }).catch((error)=>{
      alert("incorrect email/password")
    })
  }
  const handleSignup = () => {
    history.push('/signup'); // Redirect to Signup page
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <br/>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
