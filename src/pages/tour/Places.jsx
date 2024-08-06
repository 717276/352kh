import { useState, useEffect } from 'react';

const Places = ({ createdPlace, places, width, height }) => {    
    return (
        <div>
            {places && places.length > 0 ? (places.map((place, index) => (
                <div key={index} onClick={()=>{createdPlace(place)}}>
                    <span>{place.name}</span>
                    <div className="place_img">                    
                        <img src={place.photo} style={{ width: `${width}px`, height: `${height}px` }} />
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