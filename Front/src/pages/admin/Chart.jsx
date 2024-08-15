import '../../components/css/admin/Chart.css';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie } from 'recharts';
import { useEffect, useState } from 'react';
import '../../components/css/admin/Chart.css'

const Chart = () => {
  const nav = useNavigate();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const url = 'http://localhost:8080/api/chart/getChart1';
  const url2 = 'http://localhost:8080/api/chart/getChart2';
  const url3 = 'http://localhost:8080/api/chart/getChart3';


  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map(item => ({
          name: item.THEME,
          value: item.USAGE_PERCENTAGE
        }));
        setData(transformedData);
      })
      .catch(error => {
        console.error('Error processing data:', error);
      });

    fetch(url2)
      .then(response => response.json())
      .then(data => {
        const transformedData2 = data.map(item => ({
          pdNo: item.PD_NAME,
          sum: item.SUM,
        }));
        setData2(transformedData2);
      })
      .catch(error => {
        console.error('Error processing data:', error);
      });

    fetch(url3)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const transformedData3 = data.map(item => ({
          date: item.PAYT_DATE,
          sum: item.TOTAL_SALES,
        }));
        setData3(transformedData3);
        console.log(transformedData3);
      })
      .catch(error => {
        console.error('Error processing data:', error);
      });

  }, [url2]);

  return (
    <>
      <div className='Chart'>
        <div className='mg_box'>
          <div className='mg_mangeMenu'>
            <ul>
              <li onClick={() => { nav('/admin/') }}>회원관리</li>
              <li onClick={() => { nav('/admin/tripList') }}>여행관리</li>
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
          <BarChart width={730} height={250} data={data2} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pdNo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#8884d8" />
          </BarChart>
        </div>

        <div className='chart3'>
          <h3>월별 투어 매출액</h3>
          <LineChart width={730} height={250} data={data3} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sum" stroke="#8884d8" />
          </LineChart>
        </div>

      </div>
    </>
  );
};

export default Chart;
