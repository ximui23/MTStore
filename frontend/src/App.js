import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  //get user info
  const userSignin = useSelector((state => state.userSignin));
  const {userInfo} = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">MTStore</Link>
            </div>
            <div>
                <Link to="/cart">
                Cart
                {/* Contional Rendering Section */}
                {cartItems.length > 0 && (
                  //if cartItems.length > 0 then render this
                  <span className="badge">{cartItems.length}</span>
                )}
                </Link>
                {/* Conditional rendering for Signin */}
                {
                  userInfo ? (
                  //render user's name if user exists
                  <div className="dropdown">
                    <Link to="#">
                      {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </ul>
                  </div>
                    
                  ) : 
                  //else render Sign In
                  <Link to="/signin">Sign In</Link>
                }
            </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
