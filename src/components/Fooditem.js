import React, { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Fooditem = (props) => {
    let dispatch = useDispatchCart();
    let cartData = useCart();

    const { _id, CategoryName, name, img, options } = props.fooditem;
    let option = options[0];
    let priceOption = Object.keys(option);

    const [qauntity, setQquntity] = useState(1)
    const handleQuantityClick = (e) => {
        setQquntity(e.target.value)
    }

    const [opt, setOpt] = useState(priceOption[0])
    const handleOptionClick = (e) => {
        setOpt(e.target.value);
    }

    const handleAddToCart = async () => {
        let food = [];
        for (const item of cartData) {
            if (item.id === _id) {
                food = item
                break;
            }}
            if (food.length!==0) {
                if (food.opt === opt) {
                    await dispatch({ type: "Update", id: food.id, finalPrice: finalPrice, qauntity: qauntity })
                    return;
                }
                else if (food.opt !== opt) {
                    await dispatch({ type: "Add", id: _id, CategoryName: CategoryName, name: name, img: img, qauntity: qauntity, opt: opt, finalPrice: finalPrice })
                    return
                }
                return
            }
            await dispatch({ type: "Add", id: _id, CategoryName: CategoryName, name: name, img: img, qauntity: qauntity, opt: opt, finalPrice: finalPrice })
        
    }

    let finalPrice = qauntity * parseInt(option[opt]);

    return (
        <div className='my-3'>
            <div className="card" style={{ "width": "18rem", "height": "360px" }}>
                <img src={img} className="object-fit-cover border rounded card-img-top" style={{ "height": "180px" }} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <hr className='my-3'/>
                    <div className='my-2 container w-100 d-flex justify-content-between p-0'>
                        <div className='w-25 dropdown'>
                            <button className="btn btn-warning text-white dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {opt}
                            </button>
                            <div className="bg-warning dropdown-menu">
                                {
                                    priceOption.map((element) => {
                                        return (
                                            <button className="dropdown-item" key={element} value={element} type="button" onClick={handleOptionClick}>{element}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="w-25 dropdown">
                            <button className="btn btn-warning text-white dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                             <i class="bi bi-x"></i> {qauntity}
                            </button>
                            <div className="bg-warning dropdown-menu">
                                {
                                    Array.from(Array(5), (e, i) => {
                                        return (
                                            <button className="dropdown-item" key={i + 1} value={i + 1} type="button" onClick={handleQuantityClick}>{i + 1}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <hr className='my-3' />
                    <div className='d-flex justify-content-between align-middle'>
                        <div className='btn btn-outline-warning btn-sm my-auto'><i className="bi bi-currency-rupee"></i>{finalPrice}/-</div>
                        <button className='btn btn-warning btn-sm my-auto' onClick={handleAddToCart}>Add to Bag</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fooditem
