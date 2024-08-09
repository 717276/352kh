import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../components/css/mypage/MyPage.css";
import profileImg from "../../images/profile/profile.png";

const MyPage = () => {
  const [editField, setEditField] = useState("");
  const [tourListPage, setTourListPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [cartPage, serCartPage] = useState(1);
  const [sortType, setSortType] = useState("latest");
  const [productSortType, setProductSortType] = useState("latest");
  const itemsPerPage = 5;
  const [user, setUser] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [tourListData, setTourListData] = useState([]);
  const [sortedProductData, setSortedProductData] = useState([]);
  const [cartProductData, serCartProductData] = useState([]);
  const [updateValues, setUpdateValues] = useState({});
  const nav = useNavigate();
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userNo = decodedToken.userNo;
  useEffect(() => {
    if (!token) {
      console.error("No access token found");
      nav("/login");
      return;
    }

    const url = `http://localhost:8080/api/mypage/${userNo}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setSortedData(data.tours);
        setSortedProductData(data.orderItems);
        serCartProductData(data.cartItems);
        setTourListData(data.tourList);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userNo, nav, token]);

  useEffect(() => {
    const sorted = [...(user?.tours || [])].sort((a, b) => {
      if (sortType === "latest") {
        return b.t_no - a.t_no;
      } else {
        return a.t_no - b.t_no;
      }
    });
    setSortedData(sorted);
  }, [sortType, user]);

  const getImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_category}_${img.i_ref_no}_${img.i_order}.jpg`;
  };

  const getProImageUrl = (img) => {
    return `/images/${img.i_category}/${img.i_category}_${img.i_ref_no}_${img.i_order}.png`;
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  useEffect(() => {
    let filteredProducts = [...(user?.orderItems || [])];
    if (productSortType === "ready") {
      filteredProducts = filteredProducts
        .filter((product) => product.oi_status === 0)
        .sort((a, b) => b.oi_no - a.oi_no);
    } else if (productSortType === "shipping") {
      filteredProducts = filteredProducts
        .filter((product) => product.oi_status === 1)
        .sort((a, b) => b.oi_no - a.oi_no);
    } else if (productSortType === "completion") {
      filteredProducts = filteredProducts
        .filter((product) => product.oi_status === 2)
        .sort((a, b) => b.oi_no - a.oi_no);
    } else {
      filteredProducts = filteredProducts.sort((a, b) => b.oi_no - a.oi_no);
    }
    setSortedProductData(filteredProducts);
  }, [productSortType, user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setUpdateValues({
          ...updateValues,
          POSTNO: data.zonecode,
          BASICADDRESS: data.roadAddress,
        });
      },
    }).open();
  };

  const totalTourListPages = Math.ceil(tourListData.length / itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const totalProductPages = Math.ceil(sortedProductData.length / itemsPerPage);
  const totalCartPages = Math.ceil(cartProductData.length / itemsPerPage);

  const handleChangeTourListPage = (page) => {
    setTourListPage(page);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangeProductPage = (page) => {
    setProductPage(page);
  };

  const handleChangeCartPage = (page) => {
    serCartPage(page);
  };

  const toggleEditField = (field) => {
    setEditField(editField === field ? "" : field);
  };

  const tourListstartIndex = (tourListPage - 1) * itemsPerPage;
  const selectedTourListItems = tourListData.slice(
    tourListstartIndex,
    tourListstartIndex + itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const productStartIndex = (productPage - 1) * itemsPerPage;
  const selectedProductItems = sortedProductData.slice(
    productStartIndex,
    productStartIndex + itemsPerPage
  );

  const cartStartIndex = (cartPage - 1) * itemsPerPage;
  const selectedcartItems = cartProductData.slice(
    cartStartIndex,
    cartStartIndex + itemsPerPage
  );

  const getDogSizeText = (size) => {
    switch (size) {
      case 0:
        return "소형견";
      case 1:
        return "중형견";
      case 2:
        return "대형견";
      default:
        return "알 수 없음";
    }
  };

  const getOrderStatusText = (status) => {
    switch (status) {
      case 0:
        return "상품준비중";
      case 1:
        return "배송중";
      case 2:
        return "배송완료";
      default:
        return "알 수 없음";
    }
  };

  const getPaymentTypeText = (type) => {
    switch (type) {
      case 0:
        return "카드/간편결제";
      case 1:
        return "실시간 계좌이체";
      case 2:
        return "가상계좌";
      case 3:
        return "휴대폰 결제";
      default:
        return "알 수 없음";
    }
  };

  const handleInputChange = (field, value) => {
    setUpdateValues({
      ...updateValues,
      [field]: value,
    });
  };

  const handleSubmit = (field) => (e) => {
    e.preventDefault();

    const payload = {
      userNo: parseInt(userNo, 10),
      ...updateValues,
    };

    let endpoint = "";

    switch (field) {
      case "ADDRESS":
        endpoint = "/mypage/updateAddress";
        break;
      case "USERID":
        endpoint = "/mypage/updateUserId";
        break;
      case "NAME":
        endpoint = "/mypage/updateName";
        break;
      case "PHONE":
        endpoint = "/mypage/updatePhone";
        break;
      case "DOGNAME":
        endpoint = "/mypage/updateDogName";
        break;
      case "BREED":
        endpoint = "/mypage/updateBreed";
        break;
      case "DSIZE":
        endpoint = "/mypage/updateDsize";
        break;
      default:
        return;
    }

    fetch(`http://localhost:8080/api${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // 서버에서 반환된 최신 데이터를 사용하여 상태 업데이트
        toggleEditField("");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleItemClick = (t_no) => {
    nav(`/tripDetail/${t_no}`);
  };

  const removeProduct = (ciNo) => {
    const url = `http://localhost:8080/api/deleteCart/${ciNo}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          serCartProductData(
            cartProductData.filter((product) => product.ci_no !== ciNo)
          );
        } else {
          console.error("Failed to delete cart item");
        }
      })
      .catch((error) => console.error("Error deleting cart item:", error));
  };

  const cancleTour = async (t_no) => {
    const token = localStorage.getItem("accessToken");
    console.log(token, "왜 안찍히니");
    if (!token) {
      console.error("No access token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userNo = decodedToken.userNo; // JWT에서 userNo 추출

    try {
      const response = await fetch(`http://localhost:8080/api/cancleTour`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ t_no: t_no, userNo: userNo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        setTourListData(tourListData.filter((tour) => tour.t_no !== t_no));
      }

      const data = await response.json();
      console.log("Application successful:", data);

      // 추가적인 처리 로직 (예: 성공 메시지 표시, 페이지 이동 등)
    } catch (error) {
      console.error("Error applying for tour:", error);
      // 오류 처리 로직 (예: 오류 메시지 표시)
    }
  };

  return (
    <>
      <div className="MyPage">
        <div className="section">
          <h1 className="section-title">마이페이지</h1>
          <div className="MyPageInfo">
            <div className="myinfo">
              <div className="info-section">
                <table className="mypage-table">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">{user.m_userId}</div>
                          {editField !== "USERID" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("USERID")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "USERID" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("USERID")}>
                              <input
                                type="text"
                                name="USERID"
                                placeholder="새 ID"
                                value={updateValues.USERID || ""}
                                onChange={(e) =>
                                  handleInputChange("USERID", e.target.value)
                                }
                                required
                              />
                              <br />
                              <span className="edit-description">
                                사용하실 ID를 입력해주세요.
                              </span>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("USERID")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">{user.m_email}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>주소</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">
                            우편번호: {user.m_postNo} <br />
                            기본주소: {user.m_basicAddress}
                            <br />
                            상세주소: {user.m_detailAddress}
                          </div>
                          {editField !== "ADDRESS" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("ADDRESS")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "ADDRESS" && (
                          <form
                            className="edit-field"
                            onSubmit={handleSubmit("ADDRESS")}
                          >
                            <div className="searchAddr">
                              <div className="addrInput">
                                <input
                                  type="text"
                                  name="POSTNO"
                                  placeholder="새 우편번호"
                                  value={updateValues.POSTNO || ""}
                                  readOnly
                                  required
                                />
                                <input
                                  type="text"
                                  name="BASICADDRESS"
                                  placeholder="새 기본주소"
                                  value={updateValues.BASICADDRESS || ""}
                                  readOnly
                                  required
                                />
                                <input
                                  type="text"
                                  name="DETAILADDRESS"
                                  placeholder="새 상세주소"
                                  value={updateValues.DETAILADDRESS || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "DETAILADDRESS",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>
                              <button
                                type="button"
                                className="zip-code-button"
                                onClick={handleClick}
                              >
                                우편번호 찾기
                              </button>
                              <br />
                            </div>
                            <div className="edit-buttons">
                              <button type="submit">변경</button>
                              <button
                                type="button"
                                onClick={() => toggleEditField("ADDRESS")}
                              >
                                취소
                              </button>
                            </div>
                          </form>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>이름</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">{user.m_name}</div>
                          {editField !== "NAME" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("NAME")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "NAME" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("NAME")}>
                              <input
                                type="text"
                                name="NAME"
                                placeholder="새 이름"
                                value={updateValues.NAME || ""}
                                onChange={(e) =>
                                  handleInputChange("NAME", e.target.value)
                                }
                                required
                              />
                              <br />
                              <span className="edit-description">
                                사용하실 이름을 입력해주세요.
                              </span>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("NAME")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>연락처</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">0{user.m_phone}</div>
                          {editField !== "PHONE" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("PHONE")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "PHONE" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("PHONE")}>
                              <input
                                type="text"
                                name="PHONE"
                                placeholder="새 전화번호"
                                value={updateValues.PHONE || ""}
                                maxLength={11}
                                onChange={(e) =>
                                  handleInputChange("PHONE", e.target.value)
                                }
                                required
                              />
                              <br />
                              <span className="edit-description">
                                사용하실 전화번호를 입력해주세요.
                              </span>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("PHONE")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 이름</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">{user.dog.d_name}</div>
                          {editField !== "DOGNAME" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("DOGNAME")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "DOGNAME" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("DOGNAME")}>
                              <input
                                type="text"
                                name="DOGNAME"
                                placeholder="새 강아지 이름"
                                value={updateValues.DOGNAME || ""}
                                onChange={(e) =>
                                  handleInputChange("DOGNAME", e.target.value)
                                }
                                required
                              />
                              <br />
                              <span className="edit-description">
                                강아지 이름을 입력해주세요.
                              </span>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("DOGNAME")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 종</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">{user.dog.d_breed}</div>
                          {editField !== "BREED" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("BREED")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "BREED" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("BREED")}>
                              <input
                                type="text"
                                name="BREED"
                                placeholder="새 강아지 종"
                                value={updateValues.BREED || ""}
                                onChange={(e) =>
                                  handleInputChange("BREED", e.target.value)
                                }
                                required
                              />
                              <br />
                              <span className="edit-description">
                                강아지 종을 입력해주세요.
                              </span>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("BREED")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>강아지 크기</td>
                      <td>
                        <div className="my-info">
                          <div className="my-infodesc">
                            {getDogSizeText(user.dog.d_size)}
                          </div>
                          {editField !== "DSIZE" && (
                            <button
                              type="button"
                              onClick={() => toggleEditField("DSIZE")}
                            >
                              변경
                            </button>
                          )}
                        </div>
                        {editField === "DSIZE" && (
                          <div className="edit-field">
                            <form onSubmit={handleSubmit("DSIZE")}>
                              <div className="size-choice">
                                <span>
                                  <label htmlFor="large">대형견</label>{" "}
                                  <input
                                    type="radio"
                                    name="size"
                                    id="large"
                                    checked={updateValues.DSIZE === 2}
                                    onChange={() =>
                                      handleInputChange("DSIZE", 2)
                                    }
                                    required
                                  />
                                </span>
                                <span>
                                  <label htmlFor="medium">중형견</label>{" "}
                                  <input
                                    type="radio"
                                    name="size"
                                    id="medium"
                                    checked={updateValues.DSIZE === 1}
                                    onChange={() =>
                                      handleInputChange("DSIZE", 1)
                                    }
                                    required
                                  />
                                </span>
                                <span>
                                  <label htmlFor="small">소형견</label>{" "}
                                  <input
                                    type="radio"
                                    name="size"
                                    id="small"
                                    checked={updateValues.DSIZE === 0}
                                    onChange={() =>
                                      handleInputChange("DSIZE", 0)
                                    }
                                    required
                                  />
                                </span>
                              </div>
                              <div className="edit-buttons">
                                <button type="submit">변경</button>
                                <button
                                  type="button"
                                  onClick={() => toggleEditField("")}
                                >
                                  취소
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="image-section">
                <div className="image-box">
                  <img src={profileImg} alt="프로필 이미지" />
                </div>
                <input type="file" id="file" style={{ display: "none" }} />
                <label htmlFor="file" className="image-change">
                  이미지 변경
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h1 className="section-title">투어 신청 목록</h1>
          <div className="move-order">
            <button onClick={() => nav("/tourOrder")}>구매하러 가기</button>
          </div>
          <div className="mytrip-list">
            {selectedTourListItems.map((item) => (
              <div
                key={item.t_no}
                className="mytrip-item"
                onClick={() => handleItemClick(item.t_no)}
              >
                <div className="mytriplist-details">
                  <img src={getImageUrl(item.img)} alt={item.t_title} />
                  <div className="mytrip-details">
                    <div className="mytrip-name">{item.t_title}</div>
                    <div className="mytrip-description">{item.t_explain}</div>
                    <div className="mytrip-date">
                      {formatDateToYYYYMMDD(item.t_strDate)} ~{" "}
                      {formatDateToYYYYMMDD(item.t_endDate)}
                    </div>
                    <div className="mytrip-price">{item.t_totalPrice}원</div>
                  </div>
                </div>
                <div className="mydeletecart">
                  <button
                    className="myremove-button"
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 중지
                      cancleTour(item.t_no);
                    }}
                  >
                    신청 취소
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mypagination">
            {Array.from({ length: totalTourListPages }, (_, index) => (
              <span
                key={index + 1}
                className={`mypage-span ${
                  tourListPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handleChangeTourListPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h1 className="section-title">투어 결제 목록</h1>
          <ul className="mysort-type mytrip-ul">
            <li onClick={() => setSortType("latest")}>최신순</li>
            <li onClick={() => setSortType("oldest")}>오래된 순</li>
          </ul>
          <div className="mytrip-list">
            {selectedItems.map((item) => (
              <div
                key={item.t_no}
                className="mytrip-item"
                onClick={() => handleItemClick(item.t_no)}
              >
                <div className="mytriplist-details">
                  <img src={getImageUrl(item.img)} alt={item.t_title} />
                  <div className="mytrip-details">
                    <div className="mytrip-name">{item.t_title}</div>
                    <div className="mytrip-description">{item.t_explain}</div>
                    <div className="mytrip-date">
                      {formatDateToYYYYMMDD(item.t_strDate)} ~{" "}
                      {formatDateToYYYYMMDD(item.t_endDate)}
                    </div>
                    <div className="mytrip-price">{item.t_totalPrice}원</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mypagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`mypage-span ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handleChangePage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h1 className="section-title">장바구니</h1>
          <div className="move-order">
            <button onClick={() => nav("/order")}>구매하러 가기</button>
          </div>
          <div className="myproduct-list">
            {selectedcartItems.map((item) => (
              <div key={item.ci_no} className="myproduct-item-mypage">
                <div className="myproduct-info">
                  <img
                    src={getProImageUrl(item.product.img)}
                    alt={item.product.pd_name}
                  />
                  <div className="myproduct-details">
                    <div className="myproduct-name">{item.product.pd_name}</div>
                    <div className="myproduct-quantity">
                      수량: {item.ci_quantity}
                    </div>
                    <div className="myproduct-quantity">
                      가격:{" "}
                      {Math.floor(
                        item.product.pd_price *
                          (1 - item.product.pd_discount * 0.01)
                      )}
                      원
                    </div>
                  </div>
                  <div className="mydeletecart">
                    <button
                      className="myremove-button"
                      onClick={() => removeProduct(item.ci_no)}
                    >
                      구매 취소
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mypagination">
            {Array.from({ length: totalCartPages }, (_, index) => (
              <span
                key={index + 1}
                className={`mypage-span ${
                  cartPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handleChangeCartPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h1 className="section-title">상품 결제 목록</h1>
          <ul className="mysort-type">
            <li onClick={() => setProductSortType("latest")}>전체</li>
            <li onClick={() => setProductSortType("ready")}>상품준비중</li>
            <li onClick={() => setProductSortType("shipping")}>배송중</li>
            <li onClick={() => setProductSortType("completion")}>배송완료</li>
          </ul>
          <div className="myproduct-list">
            {selectedProductItems.map((item) => (
              <div key={item.oi_no} className="myproduct-item-mypage">
                <div className="mypurchase-date">
                  {formatDate(item.oi_orderDate)}
                </div>
                <div className="myproduct-info">
                  <img
                    src={getProImageUrl(item.product.img)}
                    alt={item.product.pd_name}
                  />
                  <div className="myproduct-details">
                    <div
                      className={`myproduct-status ${getOrderStatusText(
                        item.oi_status
                      )}`}
                    >
                      {getOrderStatusText(item.oi_status)} <hr />
                    </div>
                    <div className="myproduct-name">{item.product.pd_name}</div>
                    <div className="myproduct-quantity">
                      수량: {item.oi_quantity}
                    </div>
                    <div className="myproduct-price">
                      결제금액(타입): {item.oi_price}
                      원({getPaymentTypeText(item.paymentItem.pay_type)})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mypagination">
            {Array.from({ length: totalProductPages }, (_, index) => (
              <span
                key={index + 1}
                className={`mypage-span ${
                  productPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handleChangeProductPage(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
