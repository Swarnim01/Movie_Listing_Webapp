import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Signup.css';
const Signup = () => {
  let history = useHistory();
  const [ username , setusername ]= useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const OnEmailChange = (event) => {
    setemail(event.target.value);
  };
  const OnPasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const OnSubmitSignup = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then(({ error, message }) => {
        if (error) toast.error(error);
        else if (message){ history.replace('/login');
          toast.success(message);
        };
      });
  };
  return (
    <div className="body">
      <div
      style={{
        margin: '10rem auto',
        border: '1px solid white',
        width: '40rem',
      }}
      className="container"
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
            <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' for='email-address'>
                Username
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                style={{ color: 'white' }}
                type='name'
                name='name'
                id='name'
                onChange={(e)=>setusername(e.target.value)}
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' for='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                style={{ color: 'white' }}
                type='email'
                name='email-address'
                id='email-address'
                onChange={(e)=>{OnEmailChange(e)}}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' for='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                style={{ color: 'white' }}
                type='password'
                name='password'
                id='password'
                onChange={(e)=>OnPasswordChange(e)}
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
              value='Sign Up'
              style={{
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
              }}
              onClick={(e)=>{OnSubmitSignup(e)}}
            />
          </div>
          <div className='mt3' style={{ display: 'flex' }}>
            <Link to='/login' className='f6 link dim black db'>
              Already Signed Up ? Login
            </Link>
          </div>
        </form>
      </main>
    </div>
    </div>
    
  );
};
export default Signup;
