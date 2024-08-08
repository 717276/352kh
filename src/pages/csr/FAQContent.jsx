import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/css/csr/FAQContent.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

const getCategoryName = (category) => {
    switch (category) {
        case 0:
            return '주문 / 결제';
        case 1:
            return '회원';
        case 2:
            return '배송';
        case 3:
            return '환불';
        case 4:
            return '기타';
        default:
            return '알 수 없음';
    }
};

const FAQContent = () => {
    const { faqId } = useParams();
    const nav = useNavigate();
    const [faq, setFaq] = useState(null);

    useEffect(() => {
        fetchFAQDetail();
    }, [faqId]);

    const fetchFAQDetail = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/notice/${faqId}`);
            const data = await res.json();
            setFaq(data);
        } catch (error) {
            console.error('Error fetching FAQ detail:', error);
        }
    };

    if (!faq) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="FAQContent">
                <input type="hidden" value={faq.n_no} readOnly />
                <table>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td>{faq.n_title}</td>
                        </tr>
                        <tr>
                            <td>카테고리</td>
                            <td>{getCategoryName(faq.n_category)}</td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>댕트립</td>
                        </tr>
                        <tr>
                            <td>작성일</td>
                            <td>{formatDate(faq.n_createdDate)}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea value={faq.n_content} readOnly />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="faq-buttons">
                <button onClick={() => nav('/faq')}>목록으로</button>
                <button onClick={() => nav(`/faqedit/${faqId}`)}>수정하기</button>
            </div>
        </>
    );
};

export default FAQContent;
