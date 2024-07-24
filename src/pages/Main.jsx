import '../components/css/Main.css'
const Main=()=>{
    return(
        <div className="Main">
            <div className="search">
                <input className="search_box" type="text" placeholder="검색어 입력"></input>
            </div>
            <div className='wrapper'>
                <div className="slide">
                    <div className=""></div>
                </div>
            </div>
            <div className="list"></div>
        </div>
    );
}
export default Main;