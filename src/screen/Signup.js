import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "",geolocation:""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/createuser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate('/login');
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <div className='container bg-warning rounded w-50'>
            <h3 className='my-3 fw-bolder text-dark'>Signup</h3>

            <form onSubmit={handleSubmit} className='text-dark fw-bold'>
                <div className='mb-3'>
                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" className="form-control" id="name" name='name' value={creds.name} onChange={onChange} aria-describedby="inputGroupPrepend2" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={creds.password} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                    <textarea type="text" className="form-control" id="address" name='geolocation' value={creds.geolocation} onChange={onChange} placeholder="1234 Main St" required/>
                </div>
                <button type="submit" className="mb-3 btn btn-dark">Submit</button>
            </form>
        </div>
    )
}

export default Signup
