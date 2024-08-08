import '../../components/css/tour/Build.css';
import { useState, useRef, useReducer,useContext } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Hotels from './Hotels';
import Restaurante from'./Restaurantes';
import Places from './Places';
import GetPlace from './GetPlace';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../components/Auth.jsx'; // context.js 파일에서 import

class Tour {
    constructor(hotel = null, places = [], res = []) {
    this.hotel = hotel;
    this.places = places;
    this.res = res;
  }
}

// address
class Hotel {
  constructor(name, price, photo) {
    this.name = name;
    this.price = price;
    this.photo = photo;
  }
}

class Place {
  constructor(name, address, photo) {
    this.name = name;
    this.address = address;
    this.photo = photo;
  }
}

class Res {
  constructor(name, address, photo) {
    this.name = name;
    this.address = address;
    this.photo = photo;
  }
}
const SELECT_TYPES = {
    SET_HOTEL: 'SET_HOTEL',
    ADD_PLACE: 'ADD_PLACE',
    ADD_RES: 'ADD_RES',
  };
const DELETE_TYPES ={
    HOTEL: 'hotel',
    PLACE: 'place',
    RES: 'res'
}
// 일별 Tour 등록 reducer
const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_TYPES.SET_HOTEL:
            return { ...state, hotel:action.payload};
        case SELECT_TYPES.ADD_PLACE:
            return { ...state, places: [...state.places, action.payload] };
        case SELECT_TYPES.ADD_RES:
            return { ...state, res: [...state.res, action.payload] };
        case DELETE_TYPES.HOTEL:            
            return {...state, hotel:null};
        case DELETE_TYPES.PLACE:
            return {...state, places:state.places.filter(place=>place.name !== action.payload.name)}
        case DELETE_TYPES.RES:
            return {...state, res:state.res.filter(r => r.name !== action.payload.name)};
        default:
            return state;
    }
}

const initialState={
    hotel:null, 
    places:[],
    res:[],
}

const Build = () => {
    const {isAuthorized, setIsAuthorized} = useContext(AuthContext);        
    // 카테고리, 검색어 설정
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState('');
    const navigator = useNavigate();
    const [resultSearch, setResultSearch] = useState('');
    const [resultCategory, setResultCategory] = useState(category);

    const [selectedCategory, setSelectedCategory] = useState(null);
    // 검색된 데이터
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [res, setRes] = useState([]);
    const [address, setAddress] = useState('');
    // 달력
    const [day, setDay]=useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // 투어목록
    const [tours, setTours] = useState([]);

    // 임시 개별 숙소, 장소, 식당 등록
    const [state, dispatch] = useReducer(reducer, initialState);

    // Ref 
    const inputRef = useRef();
    const endIdxRef = useRef(0);
    const strIdxRef = useRef(0);
    const handleCategory = (type) => {
        setCategory(type);
        setSelectedCategory(type);
    };
    // 검색 useCallback 동작 수정 필요
    const getSearch = (category, search) => {
        if (search === '') {
            inputRef.current.focus();
            return;
        }
        const renderingSearch = async () => {
            if (category === 0) {
                const response = await fetch("http://localhost:8080/api/hotel",{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // 쿼리 문자열 형식
                    },
                    body: new URLSearchParams({ 
                        strDate: startDate,
                        endDate: endDate,
                        region: search
                    })
                })
                if (response.status === 200){
                    const hotelData = await response.json();                                        
                    setHotels(hotelData);                                
                }else {
                    console.log("search bad request : " , response.status);
                    alert("검색 지역 반려견 동반 숙박 업소 없음");
                    setSearch('');
                    inputRef.current.focus();
                }
            } else {
                setResultSearch(search);
                setResultCategory(category);
            }
        };
        renderingSearch();
    };
    
    function resultHandler(results){
        if (category === 1) {            
            setPlaces(results);
        }else {            
            setRes(results);
        }
    }
                
    // npm install react-datepicker 달력 라이브러리
    const today = new Date();    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    // 다음 일정    
    const nextTour=()=>{                      
            
            // 현재 데이터            
            if (state.hotel !== null && state.places.length > 0 && state.res.length > 0){        
                strIdxRef.current++
                if (strIdxRef.current === (endIdxRef.current + 1)){                    
                    endIdxRef.current = strIdxRef.current;
                    setTours([...tours, new Tour(state.hotel, state.places, state.res)]);                                                                       

                    state.hotel = '';
                    state.places = [];
                    state.res = [];        
                } else {                    
                    let updatedTours = [...tours];
                    // 수정 정보
                    const temp = new Tour(state.hotel, state.places, state.res);
                    updatedTours[strIdxRef.current - 1] = temp;
                    setTours(updatedTours);

                    if (strIdxRef.current < endIdxRef.current) {
                        state.hotel = tours[strIdxRef.current].hotel;
                        state.places = tours[strIdxRef.current].places;
                        state.res = tours[strIdxRef.current].res;   

                    } else {
                        state.hotel = '';
                        state.places = [];
                        state.res = [];        
                    }
                }                           
                setDay(strIdxRef.current);
            } else {
                console.log("빈 데이터");                
            }
    }
    // 이전 일정
    const prevTour=()=>{
        strIdxRef.current--;
        if (strIdxRef.current < 0) {
            strIdxRef.current = 0;
        } else {
            const previousTour = tours[strIdxRef.current];            
            state.hotel = tours[strIdxRef.current].hotel;
            state.places = tours[strIdxRef.current].places;
            state.res = tours[strIdxRef.current].res; 
            // dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: previousTour.hotel });
            // for (let i = 0; i < previousTour.places.length; ++i){
            //     dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: previousTour.places[i]});
            // }
            // for (let i = 0; i < previousTour.res.length; ++i){
            //     dispatch({ type: SELECT_TYPES.ADD_RES, payload: previousTour.res[i] }); 
            // }                               
        }
        setDay(strIdxRef.current);
    }

    // 개별 Tour 등록
    function createdHotel(data){        
        setAddress(data.name);
        dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: new Hotel(data.name, data.price, data.image) });
    }
    function createdPlace(data){
        setAddress(data.name);        
        dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: new Place(data.name, data.address, data.photo) });        
    }
    function createdRes(data){                
        dispatch({ type: SELECT_TYPES.ADD_RES, payload: new Res(data.name, data.address, data.photo) });        
    }

    function deleteOption(category, data){
        switch(category){
            case 0:
                dispatch({type:DELETE_TYPES.HOTEL, payload: data});
                break;
            case 1:
                dispatch({type:DELETE_TYPES.PLACE, payload: data});
                break;
            case 2:
                dispatch({type:DELETE_TYPES.RES, payload: data});
                break;
        }        
    }
    // 날짜 변경
    const formatDate = (date, type) => {
        let year;
        let month;
        let day;        
        if (!date) return '';
        if (type === 'str'){
            year = date.getFullYear();
            month = (date.getMonth() + 1).toString().padStart(2, '0');
            day = date.getDate().toString().padStart(2, '0');            
        } else {            
            let newDate = new Date(date);
            newDate.setDate(date.getDate()+1);
            year = newDate.getFullYear();
            month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth is zero-based, so we add 1
            day = newDate.getDate().toString().padStart(2, '0');                                     
        }
        return `${year}-${month}-${day}`;
    };
    const handleDateChange = (date) => {                
        const strDate = formatDate(date,'str');
        const endDate = formatDate(date,'end');
        setStartDate(strDate);
        setEndDate(endDate);
    };
    // 데이터 전송
    const handleNav= async()=>{
        if (state.hotel !== null && state.places.length > 0 && state.res.length > 0){                    
            console.log("async ");
            await nextTour();
        }              
        navigator('/trip',{state : {
            data:tours
        }});
    }
    
    return (
        <div className="Build">
            <div className="build build_list_box">
                <div className="build_calendar">                    
                    <DatePicker
                        className='strDay'
                        selected={startDate ? new Date(startDate) : null}
                        onChange={handleDateChange}
                        selectsStart
                        startDate={startDate ? new Date(startDate) : null}
                        minDate={tomorrow}
                        placeholderText="여행시작일"
                        dateFormat="yyyy-MM-dd"
                    />
                    {/* <DatePicker className='endDay'                    
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="돌아오는날"
                        dateFormat="yyyy-MM-dd"
                    /> */}
                </div>
                <ul className="build_category_list">
                    <li className={selectedCategory === 0 ? 'selected' : ''}
                        onClick={() => handleCategory(0)}>
                            호텔
                    </li>
                    <li
                        className={selectedCategory === 1 ? 'selected' : ''}
                        onClick={() => handleCategory(1)}
                    >
                        장소
                    </li>
                    <li
                        className={selectedCategory === 2 ? 'selected' : ''}
                        onClick={() => handleCategory(2)}
                    >
                        음식
                    </li>
                </ul>
                <div className="build_search">
                    <input
                        className="build_input"
                        ref={inputRef}
                        type="text"
                        placeholder="지역 입력"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                                             
                    <img className='search_btn_img' src="/images/util/search.png" onClick={() => getSearch(category, search)}></img>
                    
                </div>
                {/* 검색 데이터 출력 */}
                <div className='data_list'>
                    {category === 0 && <Hotels createdHotel={createdHotel} hotels={hotels} width={150} height={100}/>}
                    {category === 1 && <Places createdPlace={createdPlace} places={places} width={150} height={100}/>}
                    {category === 2 && <Restaurante createdRes={createdRes} res={res} width={150} height={100}/>}
                </div>
            </div>
            {/* 선택된 데이터 출력 */}
            <div className="build build_selected_box">
                <h4>숙소</h4>
                <div className="selected_item selected_hotel">
                    {state.hotel ? (
                        <div>
                            <div className="selected_hotel_img">
                                <img src={state.hotel.photo} />
                                <button onClick={()=>deleteOption(0, state.hotel)}>X</button>                                    
                            </div>
                            <span>{state.hotel.name}</span>
                            <div className="hotel_price">{state.hotel.price}</div>
                        </div>
                    ) : (
                        <p>숙소를 선택해 주세요</p>
                    )}
                </div>
                <h4>장소</h4>
                <div className="selected_item selected_places">                                        
                    {state.places && state.places.length > 0 ? (                        
                        state.places.map((place,index)=>(
                            <div key={index}>                                
                                <div className='selected_place_img'>
                                    <img src={place.photo}></img>
                                    <button onClick={()=>deleteOption(1, place)}>X</button>                                    
                                </div>
                                <div className='selected_place_name'>
                                    <span>{place.name}</span>
                                </div>
                                <div className='selected_place_address'>
                                    <span>{place.address}</span>
                                </div>
                            </div>
                        ))
                    ):(<p>장소를 선택해 주세요</p>)                    
                    }
                </div>
                <h4>음식</h4>
                <div className='selected_item selected_res'>
                    {state.res && state.res.length > 0 ?(
                        state.res.map((restaurante,index)=>(
                            <div key={index}>
                                <div className='selected_res_img'>
                                    <img src={restaurante.photo}></img>
                                    <button onClick={()=>deleteOption(2, restaurante)}>X</button> 
                                </div>
                                <div className='selected_res_name'>
                                    <span>{restaurante.name}</span>
                                </div>
                                <div className='selected_res_address'>
                                    <span>{restaurante.address}</span>
                                </div>
                            </div>
                        ))):(<p>식당을 선택해 주세요..</p>)}
                </div>
                <div className="tour_btn">
                    <div className="saveTour_prev_btn" onClick={()=>prevTour()}>
                        이전 일정
                    </div>
                    <div>
                        Day {(strIdxRef.current + 1)}
                    </div>
                    <div className="saveTour_next_btn" onClick={()=>nextTour()}>
                        다음 일정
                    </div>
                </div>
            </div>
            {/* npm install '@vis.gl/react-google-maps' */}
            <div className="build google_map">                
                <GetPlace className="g_map" search={resultSearch} category={resultCategory} address={address} filteredData={resultHandler}></GetPlace>                                                                   
            </div>
            <div>
                <button onClick={handleNav}>완료</button>
            </div>
        </div>
    );
}
export default Build;