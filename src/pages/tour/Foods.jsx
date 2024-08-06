import {useState,useEffect} from 'react';

const Foods=({createdRes, res, width, height})=>{    

    return (
        <div>
            {res && res.length>0?(
                res.map((res,index)=>(
                    <div key={index} onClick={()=>{createdRes(res)}}>
                        <span>{res.name}</span>
                        <div className="place_img">
                            <img src={res.photo} style={{ width: `${width}px`, height: `${height}px` }}/>
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