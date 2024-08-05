import '../components/css/Main.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as LoginFunctions from '../components/js/Login.js';
const Main=()=>{    
    useEffect(()=>{                
        const accessToken = localStorage.getItem('accessToken');        
        if (accessToken !== null && accessToken !== "null") {            
            // 확인용
            // const decodedToken = jwtDecode(accessToken);
            // console.log(decodedToken.userNo);                          
        } 
    },[]);

    const slide_dummy =
        [
            '/images/tour/place1.png',
            '/images/tour/place2.png',
            "/images/tour/place3.png",
        ];    
    const tour_dummy = [
            { no: 1, url: '/images/tour/place1.png' },
            { no: 2, url: '/images/tour/place2.png' },
            { no: 3, url: '/images/tour/place3.png' },
            { no: 4, url: '/images/tour/place1.png' },
            { no: 5, url: '/images/tour/place2.png' },
            { no: 6, url: '/images/tour/place3.png' },
        ];
    const [imgs, setImgs] = useState(slide_dummy);
    const [tourImgs, setTourImgs] = useState(tour_dummy);
    const [curIdx, setIdx] = useState(0);
    useEffect(()=>{
        async ()=>{
            const response = await fetch('/main/slideImgs');
            const imgs = await response.json();
            setImgs(imgs);
        }
        async ()=>{
            const response = await fetch('/main/tourImgs');
            const imgs = await response;
            setTourImgs(imgs);
        }
    },[])
    const nextSlide = () => {
        setIdx((prevIndex) => (prevIndex + 1) % imgs.length);
    };
    const prevSlide = () => {
        setIdx((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length);
    };
    return(
        <div className="Main">
            <div className="main_search">
                <input className="main_search_box" type="text" placeholder="검색어 입력"></input>
            </div>
            <div className='wrapper'>
                <div className="main_slide">
                    <div className="img_box">
                        {
                            imgs.length > 0 ? (<img src={imgs[curIdx]}/>) : (<p>Loading...</p>)
                        }
                    </div>
                </div>
                <span className="slide_btn prev_btn" onClick={prevSlide}>Prev</span>
                <span className="slide_btn next_btn" onClick={nextSlide}>Next</span>
            </div>
            <div className="tourList">                
                <div className='tour_wrapper'>                                            
                    {
                        tourImgs.length > 0 ? (
                        tourImgs.map(tourVo => (
                            <div key={tourVo.no} className="tour_img_div">                            
                                <Link to={`/tripDetail?no=${tourVo.no}`}><img className="tour_img" src={tourVo.url}/></Link>
                            </div>
                        ))) : (<p>No Data</p>)
                    }
                </div>
            </div>
        </div>
    );
}
export default Main;