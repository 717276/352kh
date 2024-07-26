import '../../components/css/admin/ProductList.css';
import { useNavigate } from 'react-router-dom';

// 예시 데이터
const tableData = [
  { no: 1, name: 'product1', mount: 28, price: 5000, discount: 10 },
  { no: 2, name: 'product2', mount: 50, price: 10000, discount: 10 },
  { no: 3, name: 'product3', mount: 28, price: 15000, discount: 10 },
];

const ProductList = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="ProductList">
        <h3>상품관리</h3>
        <table className="ProductListTable">
          <tr>
            <th>no</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>수량</th>
            <th>정가</th>
            <th>할인율</th>
            <th>판매가</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
          {tableData.map((row) => (
            <tr key={row.no}>
              <td>{row.no}</td>
              <td>{row.img}</td>
              <td>{row.name}</td>
              <td>{row.mount}</td>
              <td>{row.price}</td>
              <td>{row.discount}</td>
              <td>{row.discountPrice}</td>
              <td><button onClick={() => { nav(`/admin/productRegister/${row.no}`) }}>수정</button></td>
              <td><button>삭제</button></td>
            </tr>
          ))}
        </table>
        <div className='productListButton'>
          <button onClick={() => { nav('/admin/productRegister') }}>상품등록</button>
        </div>
      </div>

    </>
  );
};

export default ProductList;
