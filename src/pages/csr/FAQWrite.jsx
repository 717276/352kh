import '../../components/css/csr/QnAWrite.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const FAQWrite = () => {
    const nav = useNavigate();
    const titleRef = useRef();
    const contentRef = useRef();
    const categoryRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const submitFaq = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const category = categoryRef.current.value;

        if (!title || !content || !category) {
            setErrorMessage('모든 필드를 채워주세요.');
            return;
        }

        const faqData = {
            n_title: title,
            n_content: content,
            n_category: parseInt(category),
        };

        fetch('http://localhost:8080/api/notice/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faqData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    nav('/faq');
                } else {
                    setErrorMessage('FAQ 제출에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
            });
    };

    return (
        <>
            <div className="QnAWrite">
                <input type="hidden" name="userId" id="userId" />
                <table>
                    <tr>
                        <td>카테고리</td>
                        <td>
                            <select ref={categoryRef}>
                                <option value="0">주문 / 결제</option>
                                <option value="1">회원</option>
                                <option value="2">배송</option>
                                <option value="3">환불</option>
                                <option value="4">기타</option>
                            </select>
                        </td>
                        <td>작성자</td>
                        <td>댕트립</td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td colSpan={3}>
                            <input type="text" ref={titleRef} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <textarea ref={contentRef}></textarea>
                        </td>
                    </tr>
                </table>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="subButton">
                    <button onClick={submitFaq} type="button">
                        제출하기
                    </button>
                    <button
                        type="button"
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

export default FAQWrite;
