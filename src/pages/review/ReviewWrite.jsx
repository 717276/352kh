import './css/ReviewWrite.css';

const ReviewWrite = ()=> {
  return (
    <div className='ReviewWrite'>
      <h3>투어선택</h3>
      <select>
        <option value="tour1">투어 1</option>
        <option value="tour2">투어 2</option>
        <option value="tour3">투어 3</option>
        <option value="tour4">투어 4</option>
      </select>
      <h3>제목</h3>
      <input type="text" />
      <br />
      <h3>내용</h3>
      <textarea name="" id=""></textarea>
      <h3>이미지</h3>
      파일명 : <input type="file" name="myfile"/>
      <button type="submit">제출하기</button>
    </div>
  );
};

export default ReviewWrite;