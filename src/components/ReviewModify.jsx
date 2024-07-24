import { useParams } from "react-router-dom";
import './css/ReviewModify.css';

const ReviewModify = ()=> {
  const params = useParams();
  return (
    <div className='ReviewModify'>
      <table>
        <tr>
          <td>투어</td>
          <td>투어1</td>
          <td>작성자</td>
          <td>홍길동</td>
        </tr>
        <tr>
          <td>제목</td>
          <td colSpan={3}>바다가자 솔직투어입니다</td>
        </tr>
        <tr>
          <td colSpan={4}>
            <textarea>
              djskdsjhdfkdsjsdkdjsfkdsjfkdjfkjfljfldsjfldsjfldjslf
            </textarea>
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <input type="file" name="myfile"/>
          </td>          
        </tr>
      </table>
    </div>
  );
};

export default ReviewModify;