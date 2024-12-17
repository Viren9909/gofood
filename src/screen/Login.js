import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [creds , setCreds] = useState({email:"",password:""});
  let navigate = useNavigate();

  const onChange=(e)=>{
    setCreds({...creds,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(creds)
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem("userEmail",creds.email);
      localStorage.setItem("token", json.authToken);
      navigate('/');
    }
    else{
      alert("Invailid Credentials");
    }
  }

  return (
    <div className='container bg-warning rounded w-50'>
      <h3 className='my-3 fw-bolder text-dark'>Login</h3>
      <form onSubmit={handleSubmit} className='text-dark fw-bold'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={onChange} aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={creds.password} onChange={onChange} required/>
        </div>
        <button type="submit" className="mb-3 mx-2 btn btn-primary">Submit</button>
        <Link to='/signup' className="mb-3 btn btn-primary">Signup</Link>
      </form>
    </div>
  )
}

export default Login
