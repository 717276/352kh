import '../components/css/Main.css'
import React, { useState, useEffect, useMemo , useRef} from 'react';
import MainTrip from '../pages/tour/build/MainTrip.jsx';
import Slide from '../components/Slide.jsx';
import { HTTP_STATUS } from '../components/Auth.jsx';

const Main=()=>{                    
    const [tourSlideImgs, setSlideImgs] = useState([]);
    const [tourData, setTourData] = useState([]);    
    const [url, setUrl] = useState([]);               
    const [searchTerm, setSearchTerm] = useState('');    

    useEffect(()=>{                
        const mtour = async ()=>{
            const response = await fetch('http://localhost:8080/api/main/tour');
            const tours = await response.json();      
            if (tours.length > 10) {
                const slideImg = tours.slice(0, 5);                                   
                const iconImg = tours.slice(5, 10);          
                setSlideImgs(slideImg);                            
                setTourData(iconImg);                 
                getUrl(slideImg);                                                               
            }else {          
                setSlideImgs(tours);
                setTourData(tours);
                getUrl(tours);                     
            }
        }        
        mtour();
    },[])           
    const getUrl = (slideImg) =>{                 
        if (slideImg !== null) {
            slideImg.forEach((t)=>{                
                if (t.img.i_no === -1) {
                    const randomNum = Math.floor(Math.random() * (2 + 1));
                    const newUrl = "tour_default_" + randomNum + ".jpg"; 
                    setUrl(prevUrl => [...prevUrl, newUrl]);                 
                } else{
                    const newUrl = `${t.img.i_category}_${t.img.i_ref_no}_${t.img.i_order}.jpg`;                
                    setUrl(prevUrl => [...prevUrl, newUrl]);
                }
            })
        }           
    }            
    // 검색
    const searchHandler=(e)=>{
        if (e.key === 'Enter'){
            console.log("search handler");
            search()
        }
    }    
    const search = async () =>{            
        const response = await fetch(`http://localhost:8080/api/main/search`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ search: searchTerm })
        });
        console.log("response search " + response.status);
        if (response.status === HTTP_STATUS.OK){            
            const t = await response.json();
            setTourData(t);                        
        }else{
            console.log("main search : not found");
        }        
    }        
    
    return(        
        <div className="Main">
            <div className="main_search">                
                <input className="main_search_box" type="text" placeholder="검색어 입력" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={searchHandler}></input>
                <img className="main_serach_btn_img" src="/images/util/search.png" alt="" onClick={()=>search()}/>
            </div>
            <div className='wrapper'>                             
                <Slide url={url}></Slide>                    
            </div>
            <div className="tourList">                
                <div className='tour_wrapper'>                                            
                    {tourData.length > 0 && <MainTrip tourData={tourData}></MainTrip>}
                </div>
            </div>
        </div>
    );
}
export default Main;