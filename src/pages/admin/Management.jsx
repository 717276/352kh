import '../../components/css/admin/Management.css';
const Managerment = () => {
    return (
        <div className="userList_container">
            <div className="userList_Box">
                <div className="mangeMenu">
                    <ul>
                        <li>회원관리</li>
                        <li>여행관리</li>
                        <li>상품관리</li>
                        <li>분석</li>
                    </ul>
                </div>
                <div className="userList">
                    <h2>회원관리 테이블</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>홍길동</td>
                                <td>hong@example.com</td>
                                <td>010-1234-5678</td>
                                <td>
                                    <button>삭제</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Managerment;
