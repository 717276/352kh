import {useState,useEffect} from 'react';


const Hotels =({createdHotel, hotels})=>{    
            
    return (
        <div className="hotel_data">
            {hotels && hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                    <div key={index} onClick={()=>createdHotel(hotel)}>
                        <span>{hotel.name}</span>
                        <div className="hotel_img">
                            <img src={hotel.image} alt={hotel.name} />
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