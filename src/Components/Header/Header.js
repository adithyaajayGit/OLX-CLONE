import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/Context';
function Header() {
  const {user} = useContext(AuthContext)
  const {firebase} =useContext(FirebaseContext)
  const history = useHistory()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>history.push('/home')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div class="loginPage">
  <div class="userWelcome">
    <span>{user ? `Welcome ${user.displayName}` : <span onClick={() => history.push('/')}>Login</span>}</span>
    <span class="dropdownArrow">&#9662;</span> 
    <div class="dropdown">
      {user && <span class="logoutButton" onClick={() => { firebase.auth().signOut(); history.push('/') }}>Logout</span>}
      {user && <span class="logoutButton" onClick={() => {  history.push('/productview') }}>My ADS</span>}
    </div>
  </div>
  <hr />
</div>

        < div  className="sellMenu" onClick={()=>{history.push('/create')}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
