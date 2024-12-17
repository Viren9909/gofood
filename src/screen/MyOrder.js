import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MyOrder = () => {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'))
        try {
            await fetch("http://localhost:5000/api/myOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            }).then(async (res) => {
                let response = await res.json()
                setorderData(response)
                console.log(orderData)
            })
        }
        catch (error) {
            console.log("Error While fetching Data");
        }
    }

    useEffect(() => {
        fetchMyOrder()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div className='mx-5 w-50 d-flex justify-content-start'>
                <div className='row'>
                    {
                        orderData !== null ? Array(orderData).map(data => {
                            return (
                                data.orderData ? data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                            item.map((arrayData) => {
                                                return (
                                                    <div key={String(arrayData.id) + String(arrayData.finalPrice)}>
                                                        {
                                                            arrayData.Order_date ? <div key={arrayData.Order_date} className='m-auto mt-5'>
                                                                {data = arrayData.Order_date}
                                                                <hr />
                                                            </div> :
                                                                <div key={String(arrayData.id) + String(arrayData.finalPrice)}>
                                                                    <div className="card mb-3" style={{ "width": "520px"}}>
                                                                        <div className='row g-0'>
                                                                            <div className='col-md-4'>
                                                                                <img src={arrayData.img} className="object-fit-cover border rounded card-img-top" style={{ "height": "180px" }} alt="..." />
                                                                            </div>
                                                                              <div className='col-md-8'>
                                                                                <div className="card-body">
                                                                                  <h5 className="mx-2 card-title">{arrayData.name}</h5>
                                                                                  <ul className="list-group list-group-flush">
                                                                                      <li className="list-group-item">Category : {arrayData.CategoryName}</li>
                                                                                      <li className="list-group-item">Dish Type : {arrayData.qauntity} X {arrayData.opt}</li>
                                                                                      <li className="list-group-item">Price : <i className="bi bi-currency-rupee"></i>{arrayData.finalPrice}/-</li>
                                                                                  </ul>
                                                                                </div>
                                                                              </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                    )
                                }) : ""
                            )
                        }) : ""}
                </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default MyOrder
