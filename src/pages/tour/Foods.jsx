import {useState,useEffect} from 'react';

const Foods=({createdRes, res})=>{    

    return (
        <div>
            {res && res.length>0?(
                res.map((res,index)=>(
                    <div key={index} onClick={()=>{createdRes(res)}}>
                        <span>{res.name}</span>
                        <div className="place_img">
                            <img src={res.image} />
                        <div className="place_address">
                            {res.address}
                        </div>
                    </div>

                    </div>                    
                ))
            ):(<p>Waiting...</p>)}
        </div>
    );
}
export default Foods;