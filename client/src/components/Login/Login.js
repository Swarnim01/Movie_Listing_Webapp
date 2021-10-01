import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../App';
import './Login.css';
const Login = ({ toggleSign }) => {
  let history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const OnEmailChange = (event) => {
    setemail(event.target.value);
  };
  const OnPasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const OnSubmitSignin = (e) => {
    e.preventDefault();
    fetch('/signin', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) toast.error(data.error);
        else {
          toggleSign(true);
          toast.success('Successfully Signed In');
          history.replace('/home');
          dispatch({ type: 'USER', payload: data.savedperson });
        }
      });
  };
  return (
    <div
      style={{
        margin: '10rem auto',
        border: '1px solid white',
        width: '40rem',
      }}
    >
      <div
        style={{
          color: 'red',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <p>Netflex</p>
      </div>
      <main className='pa4 black-80'>
        <form className='measure center'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f4 fw6 ph0 mh0'>Login</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' for='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-white w-100'
                style={{ color: 'white' }}
                type='email'
                name='email-address'
                id='email-address'
                onChange={(e) => OnEmailChange(e)}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' for='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-white w-100'
                style={{ color: 'white' }}
                type='password'
                name='password'
                id='password'
                onChange={(e) => OnPasswordChange(e)}
              />
            </div>
            <label className='pa0 ma0 lh-copy f6 pointer'>
              <input type='checkbox' /> Remember me
            </label>
          </fieldset>
          <div className=''>
            <input
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
              style={{
                color: 'black',
                backgroundColor: 'red',
                border: 'none',
              }}
              onClick={(e) => OnSubmitSignin(e)}
            />
          </div>
          <div className='mt3' style={{ display: 'flex' }}>
            <Link to='/signup' className='f6 link dim black db'>
              Don't Have a Account ? Sign up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};
export default Login;
