import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  //get user info
  const userSignin = useSelector((state => state.userSignin));
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">MTFengShui</Link>
          </div>
          <div>
            <Link className="navbar" to="/">Home</Link>
            <Link className="navbar" to="/about">About</Link>
            <Link className="navbar" >Products</Link>
          </div>
          <div>
            <Link className="navbar" to="/cart">
              <i class="fa fa-shopping-cart"></i>
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
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
                </div>

              ) :
                //else render Sign In
                <Link to="/signin" className="navbar">Sign In</Link>
            }
            {/* If user exist and user is adming then */}
            {userInfo && userInfo.isAdmin &&
              // render this jsx
              (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
          </div>

        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
