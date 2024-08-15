import { useState, useEffect } from "react";
import "../components/css/Slide.css";
const Slide = ({ url }) => {
  const [urlList, setUrlList] = useState(url);  
  useEffect(() => {    
    setUrlList(url);
  }, [url]);
  useEffect(() => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("main_slideshow-slide");
    const dots = document.getElementsByClassName("main_dot");

    const showSlides = () => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 2000);
    };

    showSlides();
    return () => {
        clearTimeout(showSlides);
    };
  }, [urlList]);

  const nextSlide = () => {
    const slides = document.getElementsByClassName("main_slideshow-slide");
    const dots = document.getElementsByClassName("main_dot");
    let currentSlideIndex = Array.from(slides).findIndex(
      (slide) => slide.style.display === "block"
    );
    slides[currentSlideIndex].style.display = "none";
    dots[currentSlideIndex].className = dots[
      currentSlideIndex
    ].className.replace(" active", "");

    let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[nextSlideIndex].style.display = "block";
    dots[nextSlideIndex].className += " active";
  };

  const prevSlide = () => {
    const slides = document.getElementsByClassName("main_slideshow-slide");
    const dots = document.getElementsByClassName("main_dot");
    let currentSlideIndex = Array.from(slides).findIndex(
      (slide) => slide.style.display === "block"
    );
    slides[currentSlideIndex].style.display = "none";
    dots[currentSlideIndex].className = dots[
      currentSlideIndex
    ].className.replace(" active", "");

    let prevSlideIndex =
      (currentSlideIndex - 1 + slides.length) % slides.length;
    slides[prevSlideIndex].style.display = "block";
    dots[prevSlideIndex].className += " active";
  };

  return (
    <div className="main_slider-container">
      <div className="main_slideshow">
        <div className="main_slideshow-slide">
          <img className="main_slide-image" src={`/images/tour/${url[0]}`} alt="slide1" />
        </div>
        <div className="main_slideshow-slide">
          <img className="main_slide-image" src={`/images/tour/${url[1]}`} alt="slide2" />
        </div>
        <div className="main_slideshow-slide">
          <img className="main_slide-image" src={`/images/tour/${url[2]}`} alt="slide3" />
        </div>
        <div className="main_slideshow-slide">
          <img className="main_slide-image" src={`/images/tour/${url[3]}`} alt="slide4" />
        </div>
        {/* {urlList.map((url, index) => (
          <div className="slideshow-slide" key={index}>
            <img className="slide-image" src={url} alt={`slide${index + 1}`} />
          </div>
        ))} */}
        <button className="main_prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="main_next" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="main_slideshow-nav">
          <span className="main_dot"></span>
          <span className="main_dot"></span>
          <span className="main_dot"></span>
          <span className="main_dot"></span>
        </div>
      </div>
    </div>
  );
};
export default Slide;
