import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

import '../Stylings/Login.css';



const LoginSignup = ({ setIsLoggedIn }) => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [recoveryEmail, setRecoveryEmail] = useState('')

  const [message, setMessage] = useState('');

  const [isSignup, setIsSignup] = useState(true);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const validatePassword = (password) => {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return regex.test(password);

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage('');



    if (isSignup && !validatePassword(password)) {

      setMessage('Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, and 1 number.');

      return;

    }



    setLoading(true);



    const endpoint = isSignup ? 'register' : 'login';

    try {

      const response = await axios.post(

        `http://localhost:5000/api/auth/${endpoint}`,

        { email, password, recoveryEmail },

        {

          headers: { 'Content-Type': 'application/json' },

        }

      );

      if (isSignup) {

        // ✅ After signup, show message and switch to login form

        setMessage('Account created successfully! Please log in.');

        setIsSignup(false);

      } else {



        const token = response.data.token;

        if (token) {

          localStorage.setItem('token', token);

          console.log('Token stored:', token);



          // Decode the token to get user info

          const decodedToken = JSON.parse(atob(token.split('.')[1]));

          localStorage.setItem("userInfo", JSON.stringify(decodedToken));



          console.log('Decoded token:', decodedToken);



          setIsLoggedIn(true);



          const userRole = response.data.role;

          navigate(userRole === 'admin' ? '/' : '/home');



          setMessage(isSignup ? 'Account created successfully!' : 'Logged in successfully!');

        }

      }

    } catch (error) {

      console.error('Auth error:', error);

      if (error.response?.data?.error === 'User already exists') {

        setMessage('This email is already registered. Please log in instead.');

      } else {

        setMessage(error.response?.data?.message || 'Email or password is incorrect');

      }

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="main-container">

      <div className="image-box">

        <div className="image-container">

          <div className="top-left-text">

            <h2>Welcome to <span>Flex Fuel</span></h2>

          </div>

          <div className="center-text-block">

            <p>Your journey to a healthier life starts here.</p>

            <p>“Push yourself, because no one else is going to do it for you.”</p>

            <p>

              Flex Fuel is your all-in-one platform where you can hire professional trainers,

              shop gym and fitness-related products, and track your workout progress — all in one place.

            </p>

            <p>Login or sign up now to begin your fitness transformation!</p>

          </div>

        </div>

      </div>



      <div className="login-signup-container">

        <div className="logo-container">

          <h1 className="logo">Flex Fuel</h1>

        </div>

        <div className="type_of_form">

          <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>



          {message && (

            <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>

          )}



          <form onSubmit={handleSubmit}>

            <input

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              placeholder="Email"

              required

            />

            {isSignup &&

              <input

                type="email"

                value={recoveryEmail}

                onChange={(e) => setRecoveryEmail(e.target.value)}

                placeholder="Recovery Email"

                required

              />}

            <input

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              placeholder="Password"

              required

            />

             {isSignup && (

              <small className="password-hint">

                Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number.

              </small>

            )}

            {!isSignup && (

              <div className="text-right mb-3">

                <Link to="/forgot-password" className="forgetPassword">

                  Forgot Password?

                </Link>

              </div>

            )}

            <button type="submit" disabled={loading}>

              {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}

            </button>

          </form>





          <div className="form-toggle-wrapper">

            <button onClick={() => setIsSignup(!isSignup)}>

              {isSignup ? 'Have account? Log in' : 'No account? Sign up'}

            </button>

          </div>



        </div>

      </div>

    </div>

  );

};



export default LoginSignup;