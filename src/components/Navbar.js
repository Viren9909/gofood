import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';

const Navbar = () => {

    const handleClick = () => {
        localStorage.removeItem("token");
    }

    let cartData = useCart();
    let navigate = useNavigate();

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-warning">
                <div className="container-fluid">
                    <Link className="navbar-brand text-dark fs-1" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                localStorage.getItem("token") && <li className="nav-item">
                                    <Link className="nav-link text-dark" aria-current="page" to="/myorder">My Orders</Link>
                                </li>
                            }
                        </ul>
                        {
                            localStorage.getItem("token") ? <div className='d-flex'>
                                <button className='btn btn-outline-dark position-relative mx-2' onClick={() => { navigate('/cart') }}>
                                    <i className="bi bi-cart2 fs-5 py-1"></i>
                                    {cartData.length !== 0 && <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                        {cartData.length}
                                    </span>}
                                </button>
                                <Link className="btn btn-outline-dark mx-2" to="/login" onClick={handleClick}>Logout</Link>
                            </div> : <div className='d-flex'>
                                <Link className="btn btn-outline-dark mx-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-dark" to="/signup">Signup</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
