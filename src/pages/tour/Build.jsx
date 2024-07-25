import '../../components/css/tour/Build.css';
const Build=()=>{
    return (
        <div className="Build">            
            <div className="build build_list_box">
                <div className="build_search">
                    <input className="build_input" type="text" placeholder=''/>
                </div>
                <ul className="build_list">
                    <li>
                        호텔
                    </li>
                    <li>
                        장소
                    </li>
                    <li>
                        식당
                    </li>
                </ul>
            <div className="build_option_list">
                
            </div>
            </div>
            <div className="build build_select_box">

            </div>
            <div className="build_map">

            </div>
        </div>
    );
}
export default Build;