import { useState } from 'react';
import '../../components/css/tour/Trip.css';
import place1 from '../../images/place/place1.png';
import place2 from '../../images/place/place2.png';
import place3 from '../../images/place/place3.png';

// 50개 이상의 mockData 생성
const mockData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  img: [place1, place2, place3][index % 3],
  name: ['바다가자', '단풍 구경가자', '도시 야경 구경가자'][index % 3],
  location: '서울시 강남구 호산빌딩'
}));

const Trip = () => {
  const [visibleItems, setVisibleItems] = useState(6);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  // mockData를 3개씩 묶어서 그룹화
  const groupedData = [];
  for (let i = 0; i < mockData.length; i += 3) {
    groupedData.push(mockData.slice(i, i + 3));
  }

  return (
    <>
      <div>
        <div className='title'><h1>투어 추천 리스트</h1></div>
        {groupedData.slice(0, visibleItems / 3).map((group, groupIndex) => (
          <div className='TourList' key={groupIndex}>
            {group.map((item) => (
              <div className='listItem' key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className='placeDescription'>
                  <div className='placeName'>{item.name}</div>
                  <div className='placeLocation'>{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {visibleItems < mockData.length && (
          <div className='loadMore'>
            <button onClick={loadMore}>+ 더보기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Trip;
