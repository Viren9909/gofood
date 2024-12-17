import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Fooditem from '../components/Fooditem'
import bbqCarousel from "../components/images/bbq-carousel.jpg"
import burgerCarousel from "../components/images/burger-carousel.jpg"
import desertCarousel from "../components/images/desert-carousel.jpg"

const Home = () => {

  const [fooditems, setFooditems] = useState([]);
  const [cate, setCate] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const response = await fetch('http://localhost:5000/api/menu/food_item', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    setFooditems(data[0]);
    setCate(data[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  const handleOnchange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true" style={{ "objectFit": "contain" }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ "zIndex": "2" }}>
            <div className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleOnchange} />
            </div>
          </div>
          <div className="carousel-item active">
            <img src={bbqCarousel} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={burgerCarousel} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={desertCarousel} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {
          cate && cate.map((category) => {
            return (
              <div className='row' key={category._id}>
                <div className='bg-warning text-dark my-3 fs-3'>{category.CategoryName}</div>
                <hr />
                {
                  fooditems && fooditems.filter((items) => {
                    return (items.CategoryName === category.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase()))
                  }).map((element) => {
                    return (
                      <div className='col-12 col-md-6 col-lg-3' key={element._id}>
                        <Fooditem fooditem={element} />
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
