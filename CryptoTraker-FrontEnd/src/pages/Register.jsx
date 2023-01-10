import React from 'react';
import UserRegisterForm from '../Components/UserRegisterForm';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../features/auth/authSlice';
import cl from "../Styles/scss/loginforminput.module.scss"


const Register = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation()
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
      const userData = await register({ Username, email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setUsername('');
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

  const handleNameInput = (e) => setUsername(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlepasswordInput = (e) => setPassword(e.target.value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <UserRegisterForm action="Sign In">

          <div className={cl.txt_field}>
            <input type="text"
              id="username"
              ref={userRef}
              value={Username}
              onChange={handleNameInput}
              autoComplete="off"
              required />
            <span></span>
            <label>UserName</label>
          </div>


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
        </UserRegisterForm>
      </form>
    </div>
  );
};

export default Register;