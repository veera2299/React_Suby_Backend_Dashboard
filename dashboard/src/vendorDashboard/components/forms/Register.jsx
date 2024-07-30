import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({username,email,password})
      })

      const data = response.json();

      if(response.ok){
        console.log(data);
        alert("vender registered");
        showLoginHandler();
      }
    } catch (error) {
      console.log("registration failed",error);
      alert("Registration failed")
    }

  }

  return (
    <div className="registerSection">
         <form className='authForm' onSubmit={submitHandler}>
        <h3>Vendor Register</h3>
        <label > Username</label>
          <input type="text"  name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='enter your username' /><br />
          <label > Email</label>
          <input type="email" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter your email' /><br />
          <label > Password</label>
          <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter your password' />
          <div className="btnSubmit"><br />
            <button type='submit'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default Register
