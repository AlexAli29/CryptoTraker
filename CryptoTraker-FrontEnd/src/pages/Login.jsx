import React from 'react';
import UserLoginForm from '../Components/UserLoginForm';
import { useNavigate } from 'react-router-dom';
import { useGetUserMutation, useLoginMutation } from '../features/auth/authApiSlice';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../features/auth/authSlice';
import { setProfile } from '../features/user/userSlice';
import cl from "../Styles/scss/loginforminput.module.scss"


const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [getUser, { isLoading: isUserLoading }] = useGetUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const userData = await login({ email, password });
      debugger
      dispatch(setCredentials({ ...userData, }));

      const user = await getUser();

      dispatch(setProfile(user));
      setEmail('');
      setPassword('');
      navigate('/main')
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlepasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <UserLoginForm action="Login">
          <div className={cl.txt_field}>
            <input type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required />
            <span></span>
            <label>Email</label>
          </div>


          <div className={cl.txt_field}>
            <input type="password"
              id="password"
              onChange={handlepasswordInput}
              value={password}
              required />
            <span></span>
            <label>Password</label>
          </div>
        </UserLoginForm>
      </form>
    </>
  )

  return content;
};

export default Login;