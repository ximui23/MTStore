import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route {...rest} render={(props) => userInfo ? (<Component {...props}></Component>)
            : (<Redirect to="/signin" />)}>

        </Route>
    )
}
