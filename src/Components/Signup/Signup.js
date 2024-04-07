import React, { useState, useContext } from 'react';
import { useHistory } from  'react-router-dom/cjs/react-router-dom.min';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneno: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      phoneno: '',
      password: '',
    };

    if (!username) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!phoneno) {
      newErrors.phoneno = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneno)) {
      newErrors.phoneno = 'Phone number must be 10 digits long.';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            phone: phoneno,
          }).then(() => {
            history.push('/');
          });
        });
      }).catch((error) => {
        console.error('Error creating user:', error);
      });
    }
  };
  const handlelogin = () => {
    history.push('/'); // Redirect to login page
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phoneno && <p className="error">{errors.phoneno}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <br />
          <button type="submit">Signup</button>
        </form>
        <br/>
        <button onClick={handlelogin}>Login</button>
      </div>
    </div>
  );
}
