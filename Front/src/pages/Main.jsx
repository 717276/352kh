import '../components/css/Main.css'
import React, { useState, useEffect, useContext } from 'react';
import MainTrip from '../pages/tour/build/MainTrip.jsx';

const Main=()=>{            
    const slide_dummy =
        [
            '/images/tour/place1.png',
            '/images/tour/place2.png',
            "/images/tour/place3.png",
        ];    
    const [imgs, setImgs] = useState(slide_dummy);
    const [tourImgs, setTourImgs] = useState();
    const [curIdx, setIdx] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    // const { uri, setUri, data } = useContext(DataContext);
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

        const intervalId = setInterval(nextSlide, 3000);
        return () => clearInterval(intervalId);
    },[])
    
    const nextSlide = () => {        
        setIdx((prevIndex) => (prevIndex + 1) % imgs.length);
    };
    const prevSlide = () => {
        setIdx((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length);
    };
    // 검색
    const searchHandler=(e)=>{
        if (e.key === 'Enter'){
            search()
        }
    }
    const search = () =>{
        console.log(searchTerm);
    }    
    return(
        <div className="Main">
            <div className="main_search">                
                <input className="main_search_box" type="text" placeholder="검색어 입력" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={searchHandler}></input>
                <img className="main_serach_btn_img" src="/images/util/search.png" alt="" onClick={()=>search()}/>
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
                        <MainTrip></MainTrip>
                    }
                </div>
            </div>
        </div>
    );
}
export default Main;