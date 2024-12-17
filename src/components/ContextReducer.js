
import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reduser = (state, action) => {
    switch (action.type) {
        case "Add":
            return [...state, { id: action.id, CategoryName: action.CategoryName, name: action.name, img: action.img, qauntity: action.qauntity, opt: action.opt, finalPrice: action.finalPrice }];
        case "Remove":
            let newArr = [...state]
            newArr.splice(action.index, 1);
            return newArr;
        case "Update":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qauntity:parseInt(action.qauntity) + food.qauntity, finalPrice: action.finalPrice + food.finalPrice }
                }
                return arr;
            })
            return arr
        case "Drop":
            let emptyArr = []
            return emptyArr;
        default:
            break;
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reduser, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);