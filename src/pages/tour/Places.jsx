import { useState, useEffect } from 'react';
import '../../components/css/tour/Place.css';
const Places = ({ createdPlace, places, width, height }) => {    
    return (
        <div className='data_list_places'>
            {places && places.length > 0 ? (places.map((place, index) => (
                <div className='places' key={index}>
                    <span>{place.name}</span>
                    <div className="place_img">                
                        <img src={place.photo} onClick={() => {createdPlace(place)}} style={{ width: `${width}px`, height: `${height}px` }} />
                    </div>                    
                    <div className='place_address'>
                        {place.address}
                    </div>
                </div>
            ))) : (<p>Waiting...</p>)}
        </div>
    );

}
export default Places;