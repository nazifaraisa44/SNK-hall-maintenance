import React, { useState } from 'react';
import '../App.css';
import Axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

const Signup = () => {
   
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [room, setRoom] = useState('');
    const [present, setPresent] = useState('');
    const [parent, setParent] = useState('');

    const navigate = useNavigate()

   const handleSubmit = (e) => {
    e.preventDefault()
    
    Axios.post('http://localhost:3000/auth/signup',{
        email,
        name,
        phone,
        password,
        id,
        room,
        present,
        parent,
    }).then(response => {
      if(response.data.status) {
        navigate('/login')
      }
       
    }).catch(err => {
        console.log(err)
    })
   }



  return (
    <div className='body'>
    <div className="wrapper">
        <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div className="input-box">
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <i className='bx bxs-envelope'></i>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Name"  onChange={(e) => setName(e.target.value)}/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Phone Number"  onChange={(e) => setPhone(e.target.value)}/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="password"   onChange={(e) => setPassword(e.target.value)}/>
        <i className='bx bxs-lock-alt' ></i>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Student ID"   onChange={(e) => setId(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Room Number"  onChange={(e) => setRoom(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Present Address" onChange={(e) => setPresent(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Parents Phone Number"  onChange={(e) => setParent(e.target.value)}/>
      </div>
      <button type='submit' className="btn">Create Account</button>

      <div className="register-link">
        <p>Already Have an Account?<Link to="/login"> Login</Link></p>
      </div>
      </form>
    </div>
    </div>
  );
};

export default Signup;
