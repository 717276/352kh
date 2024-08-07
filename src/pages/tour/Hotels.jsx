import {useState,useEffect} from 'react';
import '../../components/css/tour/Hotel.css';

const Hotels =({createdHotel, hotels, width, height})=>{    
            
    return (
        <div className="hotel_data">
            {hotels && hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                    <div key={index} >
                        <span>{hotel.name}</span>
                        <div className="hotel_img">
                            <img src={hotel.image} onClick={()=>createdHotel(hotel)} style={{ width: `${width}px`, height: `${height}px` }}/>
                        </div>
                        <div className="hotel_price">
                            {hotel.price}                            
                        </div>
                    </div>
                ))
                ) : (<p>Waiting...</p>)
            }
        </div>
    );
}
export default Hotels;