import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import '../../components/css/csr/QnAWrite.css'; // 적절한 CSS 파일 경로

const FAQEdit = () => {
    const { faqId } = useParams();
    const nav = useNavigate();
    const titleRef = useRef();
    const contentRef = useRef();
    const categoryRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchFAQDetail();
    }, [faqId]);

    const fetchFAQDetail = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/notice/${faqId}`);
            const data = await res.json();
            if (data) {
                titleRef.current.value = data.n_title;
                contentRef.current.value = data.n_content;
                categoryRef.current.value = data.n_category;
            }
        } catch (error) {
            console.error('Error fetching FAQ detail:', error);
        }
    };

    const submitFaq = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const category = categoryRef.current.value;

        if (!title || !content || !category) {
            setErrorMessage('모든 필드를 채워주세요.');
            return;
        }

        const faqData = {
            n_no: faqId,
            n_title: title,
            n_content: content,
            n_category: parseInt(category),
        };

        fetch(`http://localhost:8080/api/notice/update`, {
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
                    setErrorMessage('FAQ 수정에 실패했습니다.');
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
                    <tbody>
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
                    </tbody>
                </table>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="subButton">
                    <button onClick={submitFaq} type="button">
                        수정하기
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

export default FAQEdit;
