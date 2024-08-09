import '../../components/css/admin/Chart.css';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';

const Chart = () => {
  const nav = useNavigate();

  const [data, setData] = useState([]);
  const url = 'http://localhost:8080/api/chart/getChart1';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map(item => ({
          name: item.CATEGORY, // 카테고리 이름
          value: item.VALUE,   // 비율
          booking: item.BOOKING   // 비율
        }));
        setData(transformedData);
      })
      .catch(error => {
        console.error('Error processing data:', error);
      });
  }, [url]);

  return (
    <>
      <div className='Chart'>
        <div className='mg_box'>
          <div className='mg_mangeMenu'>
            <ul>
              <li onClick={() => { nav() }}>회원관리</li>
              <li onClick={() => { nav() }}>여행관리</li>
              <li onClick={() => { nav('/admin/productList') }}>상품관리</li>
              <li onClick={() => { nav('/admin/chart') }}>분석</li>
            </ul>
          </div>
        </div>

        <div className='chart1'>
          <h3>테마별 이용률</h3>
          <BarChart width={730} height={250} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        <div className='chart2'>
          <h3>상품별 총 매출액</h3>
          <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Line type="monotone" dataKey="booking" stroke="#8884d8" />
          </LineChart>
        </div>

      </div>
    </>
  );
};

export default Chart;
