import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {register} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');// default value for email is '' empty string
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //when signin success, user will be redirected to shipping screen
    const redirect = props.location.search  //check for query string
    ? props.location.search.split('=')[1]   //if it exists, from props.location.search split at '=' and get second element
    : '/';  //no query string -> return home

    //get user info from Redux's store
    const userRegister = useSelector((state => state.userRegister));
    const {userInfo, loading, error} = userRegister;
    //initially userInfo is null

    const dispatch = useDispatch();

    //submitHandler accept event 'e'
    const submitHandler = (e) => {
        //when user click on Signin Button, this form will not refresh
        e.preventDefault();
        
        if(password !== confirmPassword){
            alert('Passwords are not match')
        }
        else{
            //if passwords match 
            dispatch(register(name, email, password));
        }
    };

    //since userInfo has been changed, this will run
    useEffect(() => {
        //if userInfo exist -> log in was successful
        if(userInfo) {
            //redirect user to 'redirect' variable
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {/* If loading is true -> show LoadingBox */}
                {loading && <LoadingBox></LoadingBox>}
                {/* If error is true -> show MessageBox */}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    {/* id="email" connect this input box to the label above */}
                    <input 
                        type="name" 
                        id="name" 
                        placeholder="Enter Name" 
                        required
                        onChange={ e => setName(e.target.value)}>
                            {/* e.target.value is the value that user enter in the input box */}
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    {/* id="email" connect this input box to the label above */}
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email" 
                        required
                        onChange={ e => setEmail(e.target.value)}>
                            {/* e.target.value is the value that user enter in the input box */}
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {/* id="email" connect this input box to the label above */}
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        required
                        onChange={ e => setPassword(e.target.value)}>
                            {/* e.target.value is the value that user enter in the input box */}
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {/* id="email" connect this input box to the label above */}
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm the Password" 
                        required
                        onChange={ e => setConfirmPassword(e.target.value)}>
                            {/* e.target.value is the value that user enter in the input box */}
                    </input>
                </div>
                <div>
                    <label />
                    {/* type="submit" when this button is clickec, submitHandler will run */}
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    {/* Redirect user to  Register Screen if they are new customers*/}
                    <label />
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
