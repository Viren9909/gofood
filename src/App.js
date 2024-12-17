import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './components/ContextReducer'
import Cart from './screen/Cart';
import MyOrder from './screen/MyOrder';

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/myorder' element={<MyOrder />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;