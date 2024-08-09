import '../../components/css/csr/QnAWrite.css';
import { useNavigate } from 'react-router-dom';

const QnAWrite = () => {
    const nav = useNavigate();
    return (
        <>
            <div className="QnAWrite">
                <input type="hidden" name="userId" id="userId" />
                <table>
                    <tr>
                        <td>투어</td>
                        <td>
                            <select>
                                <option value="tour1">투어 1</option>
                                <option value="tour2">투어 2</option>
                                <option value="tour3">투어 3</option>
                                <option value="tour4">투어 4</option>
                            </select>
                        </td>
                        <td>작성자</td>
                        <td>홍길동</td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td colSpan={3}>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <textarea name="" id=""></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <input type="file" name="myfile" />
                        </td>
                    </tr>
                </table>
                <div className="subButton">
                    <button type="submit">제출하기</button>
                    <button
                        type="cancle"
                        onClick={() => {
                            nav(-1);
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </>
    );
};

export default QnAWrite;
