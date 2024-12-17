import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'

const Cart = () => {
    let cartData = useCart();
    let dispatch = useDispatchCart();
    if (cartData.length === 0) {
        return (
            <div className='fs-3'>Cart is Empty</div>
        )
    }
    let totalAmount = cartData.reduce((total, food) => total + food.finalPrice, 0)

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    order_data: cartData,
                    order_date: new Date().toDateString()
                })
            })
            if(response.status===200){
                await dispatch({type:"Drop",})
            }
        }
        catch (error) {
            console.log("Server Error", error.message)
        }
    }

    return (
        <div className='container'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Qauntity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map((food, index) => {
                            return (
                                <tr className='align-middle' key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qauntity}</td>
                                    <td>{food.opt}</td>
                                    <td>{food.finalPrice}</td>
                                    <td><button className='btn btn-outline-danger' onClick={() => { dispatch({ type: "Remove", index: index }) }}><i className="bi bi-trash3"></i></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {console.log(cartData[0].name)}
            <div className='fs-2'>Total Amount <i className="bi bi-currency-rupee"></i>{totalAmount}/-</div>
            <button className='btn btn-warning' onClick={handleCheckOut}>Check Out</button>
        </div>
    )
}

export default Cart
