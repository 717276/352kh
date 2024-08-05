import '../../components/css/tour/Build.css';
import { useState, useRef, useEffect, useReducer, useCallback  } from 'react';
import DatePicker from 'react-datepicker';
import Hotels from './Hotels';
import Foods from'./Foods';
import Places from './Places';
import GetPlace from './GetPlace';
import 'react-datepicker/dist/react-datepicker.css';

class Tour {
    constructor(hotel = null, places = [], foods = []) {
    this.hotel = hotel;
    this.places = places;
    this.foods = foods;
  }
}

// address
class Hotel {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Place {
  constructor(name, address, image) {
    this.name = name;
    this.address = address;
    this.image = image;
  }
}

class Res {
  constructor(name, address, image) {
    this.name = name;
    this.address = address;
    this.image = image;
  }
}
const SELECT_TYPES = {
    SET_HOTEL: 'SET_HOTEL',
    ADD_PLACE: 'ADD_PLACE',
    ADD_RES: 'ADD_RES',
  };
  
const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_TYPES.SET_HOTEL:
            return { ...state, hotel:action.payload};
        case SELECT_TYPES.ADD_PLACE:
            return { ...state, places: [...state.places, action.payload] };
        case SELECT_TYPES.ADD_RES:
            return { ...state, res: [...state.res, action.payload] };
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
    // 카테고리, 검색어 설정
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState('');
    
    const [resultSearch, setResultSearch] = useState('');
    const [resultCategory, setResultCategory] = useState(category);

    const [selectedCategory, setSelectedCategory] = useState(null);
    // 검색된 데이터
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [res, setRes] = useState([]);

    // Ref 
    const mapRef = useRef(null);
    const inputRef = useRef();
    const curTourRef = useRef(0);
    const handleCategory = (type) => {
        setCategory(type);
        setSelectedCategory(type);
    };        
    // 검색    useCallback 동작 수정 필요
    const getSearch = useCallback((category, search) => {
        console.log(category + " " + search);
        if (search === '') {
            inputRef.current.focus();
            return;
        }

        const renderingSearch = async () => {
            if (category === 0) {
                const filteredData = await fetchHotels(search);
                setHotels(filteredData);
            } else {
                setResultSearch(search);
                setResultCategory(category);
            }
        };

        renderingSearch();
    }, []);

    useEffect(() => {
        console.log("rendering");
    }, [resultSearch, resultCategory]);

    function resultHandler(results){
        if (category === 1) {
            setPlaces(results);
        }else {
            setRes(results);
        }
    }
    const fetchHotels = async (search) => {
        const response = await fetch(`/api/tour/hotels?search=${search}&startDate=${startDate}`);
        return response.json();
    };
            
    // 날짜 설정
    const [day, setDay]=useState(1);
    const incrementDay = () => setDay(day + 1);
    const decrementDay = () => setDay(day > 1 ? day - 1 : 1);    

    // npm install react-datepicker 달력 라이브러리
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const today = new Date();
    
    // Tour등록
    const [tours, setTours] = useState([]);
    const saveTour = () => { 
        if (state.hotel && state.places.length > 0 && state.res.length > 0){
            curTourRef.current++;
            if(tours[curTourRef.current]) {
                const updatedTours = [...tours];
                updatedTours[curTourRef.current - 1] = new Tour(state.hotel, state.places, state.res);
                setTours(updatedTours);

                const curTour = updatedTours[curTourRef.current];
                dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: curTour.hotel });
                dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: curTour.places });
                dispatch({ type: SELECT_TYPES.ADD_RES, payload: curTour.res });
            } else {
                setTours([...tours, new Tour(state.hotel, state.places, state.res)]);
                dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: null });
                dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: [] });
                dispatch({ type: SELECT_TYPES.ADD_RES, payload: [] });
            }
            incrementDay();
        } 
    };
    // 이전 일정
    const prevTour=()=>{
        if (curTourRef.current > 0) {
            curTourRef.current--;
            const previousTour = tours[curTourRef.current];
            dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: previousTour.hotel });
            dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: previousTour.places });
            dispatch({ type: SELECT_TYPES.ADD_RES, payload: previousTour.res });
            decrementDay();
        } else {
            console.log('이전 투어가 없습니다.');
        }
    }
    // 숙소, 장소, 식당 등록
    const [state, dispatch] = useReducer(reducer, initialState);

    function createdHotel(data){        
        dispatch({ type: SELECT_TYPES.SET_HOTEL, payload: new Hotel(data.name, data.price, data.image) });
    }
    function createdPlace(data){
        dispatch({ type: SELECT_TYPES.ADD_PLACE, payload: new Place(data.name, data.address, data.image) });        
    }
    function createdRes(data){        
        dispatch({ type: SELECT_TYPES.ADD_RES, payload: new Res(data.name, data.address, data.image) });        
    }
    return (
        <div className="Build">
            <div className="build build_list_box">
                <div className="build_calendar">                    
                    <DatePicker className='strDay'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={today}
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
                <ul className="build_list">
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
                    <button
                        className="build_search_btn"
                        onClick={() => getSearch(category, search)}
                    >
                        <img src=""></img>
                    </button>
                </div>
                <div className='data_list'>
                    {category === 0 && <Hotels createdHotel={createdHotel} hotels={hotels}/>}
                    {category === 1 && <Places createdPlace={createdPlace} places={places}/>}
                    {category === 2 && <Foods createdRes={createdRes} res={res}/>}
                </div>
            </div>
            <div className="build build_selected_box">
                <div className="selected_item selected_hotel">
                    {state.hotel ? (
                        <div>
                            <h4>숙소</h4>
                            <div className="hotel_img">
                                <img src={state.hotel.image} alt={state.hotel.name} />
                            </div>
                            <span>{state.hotel.name}</span>
                            <div className="hotel_price">{state.hotel.price}</div>
                        </div>
                    ) : (
                        <p>숙소를 선택해 주세요</p>
                    )}
                </div>
                <div className="selected_item selected_places">
                    {state.places && state.places.length > 0 ? (
                        places.map((place,index)=>(
                            <div key={index}>
                                <h4>장소</h4>
                                <div className='selected_place_img'>
                                    <img src={place.image}></img>
                                </div>
                                <div className='selected_place_name'>
                                    <span>{place.name}</span>
                                </div>
                                <div className='selected_place_address'>
                                    <span>{place.address}</span>
                                </div>
                            </div>
                        ))
                    ):(<p>장소를 선택해 주세요</p>)}
                </div>
                <div className='selected_item selected_res'>
                    {state.res && state.res.length > 0 ?(
                        res.map((restaurante,index)=>(
                            <div key={index}>
                                <h4>음식</h4>
                                <div className='selected_res_img'>
                                    <img src={restaurante.image}></img>
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
                    <div className="saveTour_prev_btn" onClick={prevTour}>
                        이전 일정
                    </div>
                    <div>
                        Day {day}
                    </div>
                    <div className="saveTour_next_btn" onClick={saveTour}>
                        다음 일정
                    </div>
                </div>
            </div>
            {/* npm install '@vis.gl/react-google-maps' */}
            <div className="build google_map">                
                <GetPlace className="g_map" search={resultSearch} category={resultCategory} filteredData={resultHandler}></GetPlace>                                                                   
            </div>
        </div>
    );
}
export default Build;