import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    const dispatch = useDispatch();
    //get user details from redux store
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            //if user is null, run detailsUser action
            dispatch(detailsUser(userInfo._id));
        }
        else {
            //otherwise, fill user's name and email with data from backend
            setName(user.name);
            setEmail(user.email);
        }

    }, [dispatch, userInfo._id, user]); // add user to dependent list   
    // so when user change from null to object from backend -> useEffect run again

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and Confirm Password are not matched');
        }
        else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>User Profile</h1></div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter name" value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    // value={name} name is the state of component
                                    // onChange={(e) => setName(e.target.value) for updating old name with
                                    // new name that user input
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" placeholder="Enter email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    // value={email}, email is the state of component
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="password" placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" type="password" placeholder="Confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">Update</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
