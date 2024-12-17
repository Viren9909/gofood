import React from 'react'
import bbqCarousel from "./images/bbq-carousel.jpg"
import burgerCarousel from "./images/burger-carousel.jpg"
import desertCarousel from "./images/desert-carousel.jpg"
const Carousel = () => {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{"objectFit":"contain"}}>
            <div className="carousel-inner " id='carousel'>
                <div className='carousel-caption' style={{ "zIndex": "2" }}>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-warning text-dark bg-warning" type="submit">Search</button>
                    </form>
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
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Carousel
