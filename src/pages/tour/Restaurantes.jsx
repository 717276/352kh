import {useState,useEffect} from 'react';
import '../../components/css/tour/Res.css';
const Restaurantes=({createdRes, res, width, height})=>{    

    return (
        <div className='data_list_res'>
            {res && res.length > 0?(
                res.map((res,index)=>(
                    <div className='ress' key={index} onClick={()=>{createdRes(res)}}>
                        <span>{res.name}</span>
                        <div className="res_img">
                            <img src={res.photo} style={{ width: `${width}px`, height: `${height}px` }}/>
                        <div className="res_address">
                            {res.address}
                        </div>
                    </div>

                    </div>                    
                ))
            ):(<p>Waiting...</p>)}
        </div>
    );
}
export default Restaurantes;