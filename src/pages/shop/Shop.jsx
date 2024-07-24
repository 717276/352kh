import React, { useEffect } from 'react';
import '../components/css/Shop.css';

const Shop = () => {
    const productImages = [
        'src/images/doggoods00.png',
        'src/images/doggoods01.png',
        'src/images/doggoods02.png',
        'src/images/doggoods03.png',
    ];

    useEffect(() => {
        let slideIndex = 0;
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');

        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].className += ' active';
            setTimeout(showSlides, 2000); // Change slide every 2 seconds
        };

        showSlides();
    }, []);

    const nextSlide = () => {
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');
        let currentSlideIndex = Array.from(slides).findIndex((slide) => slide.style.display === 'block');
        slides[currentSlideIndex].style.display = 'none';
        dots[currentSlideIndex].className = dots[currentSlideIndex].className.replace(' active', '');

        let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[nextSlideIndex].style.display = 'block';
        dots[nextSlideIndex].className += ' active';
    };

    const prevSlide = () => {
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');
        let currentSlideIndex = Array.from(slides).findIndex((slide) => slide.style.display === 'block');
        slides[currentSlideIndex].style.display = 'none';
        dots[currentSlideIndex].className = dots[currentSlideIndex].className.replace(' active', '');

        let prevSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        slides[prevSlideIndex].style.display = 'block';
        dots[prevSlideIndex].className += ' active';
    };

    return (
        <div className="shop-container">
            <br />
            <br />
            <hr />
            <br />
            <br />
            <div>
                <span>메뉴2</span> &nbsp; &nbsp;
                <span>메뉴3</span> &nbsp; &nbsp;
                <span>메뉴4</span>
            </div>
            <br />
            <hr />
            <br />

            <div className="slider-container">
                <div className="slideshow">
                    <div className="slideshow-slide">
                        <img className="slide-image" src="src/images/doggoods01.png" alt="slide1" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src="src/images/doggoods00.png" alt="slide2" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src="src/images/doggoods02.png" alt="slide3" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src="src/images/doggoods03.png" alt="slide4" />
                    </div>
                    <button className="prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="next" onClick={nextSlide}>
                        &#10095;
                    </button>
                    <div className="slideshow-nav">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>
            <div className="product-grid">
                <div className="product-item">
                    <a href="#">목줄</a>
                    <br />
                    <br />
                    <img src={productImages[0]} alt="product-0" className="product-image" />
                </div>
                <div className="product-item">
                    <a href="#">사료</a>
                    <br />
                    <br />
                    <img src={productImages[1]} alt="product-1" className="product-image" />
                </div>
                <div className="product-item">
                    <a href="#">간식</a>
                    <br />
                    <br />
                    <img src={productImages[2]} alt="product-2" className="product-image" />
                </div>
                <div className="product-item">
                    <a href="#">장난감</a>
                    <br />
                    <br />

                    <img src={productImages[3]} alt="product-3" className="product-image" />
                </div>
            </div>
        </div>
    );
};

export default Shop;
