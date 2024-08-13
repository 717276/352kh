import '../components/css/Main.css'
import React, { useState, useEffect, useContext } from 'react';
import MainTrip from '../pages/tour/build/MainTrip.jsx';

const Main=()=>{                    
    const [tourSlideImgs, setSlideImgs] = useState([]);
    const [tourIconImgs, setIconImgs] = useState([]);
    const [curIdx, setIdx] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    // const { uri, setUri, data } = useContext(DataContext);
    useEffect(()=>{        
        const mtour = async ()=>{
            const response = await fetch('http://localhost:8080/api/main/tour');
            const imgs = await response.json();
            const slideImg = imgs.slice(0, 5);
            setSlideImgs(slideImg);
            const iconImg = imgs.slice(5, 10);
            setIconImgs(iconImg);
        }        
        mtour();
        const intervalId = setInterval(nextSlide, 3000);
        return () => clearInterval(intervalId);
    },[])
    
    const nextSlide = () => {        
        setIdx((prevIndex) => (prevIndex + 1) % tourSlideImgs.length);
    };
    const prevSlide = () => {
        setIdx((prevIndex) => (prevIndex - 1 + tourSlideImgs.length) % tourSlideImgs.length);
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
                            tourSlideImgs.length > 0 ? (<img src={tourSlideImgs[curIdx]}/>) : (<p>Loading...</p>)
                        }
                    </div>
                </div>
                <span className="slide_btn prev_btn" onClick={prevSlide}>Prev</span>
                <span className="slide_btn next_btn" onClick={nextSlide}>Next</span>
            </div>
            <div className="tourList">                
                <div className='tour_wrapper'>                                            
                    {tourIconImgs.length > 0 && <MainTrip tourImgs={tourIconImgs}></MainTrip>}
                </div>
            </div>
        </div>
    );
}
export default Main;