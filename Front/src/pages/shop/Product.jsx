import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/css/shop/Product.css';
import { jwtDecode } from 'jwt-decode'; 

const categoryMap = {
    0: '위생용품',
    1: '사료 및 간식',
    2: '강아지 옷',
    3: '악세서리',
};

const Product = () => {
    const nav = useNavigate();
    const { pd_category, pd_no } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(''); // 기본값 설정
    const [quantity, setQuantity] = useState(1);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')); // accessToken 상태 추가
    const decodedToken = jwtDecode(accessToken);    
    const idx = useRef(0);
    const addCart = () => {
        const faqData = {
            pd_no: pd_no,
            m_no: decodedToken.userNo,
            ci_quantity: quantity,
        };
        fetch('http://localhost:8080/api/order/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faqData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    alert('상품추가에 실패했습니다.');
                } else {
                    alert('상품추가 성공');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('서버와 통신 중 오류가 발생했습니다.');
            });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/product/${pd_no}`);
                const data = await response.json();
                setProduct(data);
                // 설정된 `data`에서 상품 이미지의 첫 번째 URL을 `mainImage`로 설정                 
                setMainImage(`/images/shop/product_${data[idx.current].pd_no}_1.jpg`);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [pd_no]);

    useEffect(() => {
        // `product`가 변경될 때 `mainImage`를 설정
        if (product) {            
            setMainImage(`/images/shop/product_${product[idx.current].pd_no}_1.jpg`);
        }
    }, [product]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value < 1 || value > product.pd_mount) {
            alert(`최대 주문 가능 수량을 확인해주세요. 재고갯수: ${product.pd_mount}`);
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    const buyDirect = () => {
        addCart();
        alert('바로구매');
        nav('/user/mypage/order');
    };

    const handleImageClick = (src) => {
        setMainImage(src);
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const productImages = [
        `/images/shop/product_${product[idx.current].pd_no}_1.jpg`,
        `/images/shop/product_${product[idx.current].pd_no}_2.jpg`,
        `/images/shop/product_${product[idx.current].pd_no}_3.jpg`,
        `/images/shop/product_${product[idx.current].pd_no}_4.jpg`,
        `/images/shop/product_${product[idx.current].pd_no}_5.jpg`,
    ];

    const getDefaultImg = () =>{        
        const imgUrl = "product_default_" + pd_category + ".jpg";      
        return imgUrl;
    }

    return (
        <div className="product_container">
            <h1>상품 페이지</h1>
            <div className="product_box">
                <div className="box_top">
                    <div>
                        <img className="mainImage" src={mainImage} alt="Main product" />
                    </div>
                    <div className="product_text">
                        <div className="product_title">{product[idx.current].pd_name}</div>
                        <div className="product_price">{product[idx.current].pd_price}원</div>
                        <hr />
                        <div className="product_details">
                            <div>설명 : {product[idx.current].pd_explain}</div>
                            <div>등록일 : {new Date(product[idx.current].pd_registrationDate).toLocaleDateString()}</div>
                            <div>카테고리 : {categoryMap[product[idx.current].pd_category]}</div>
                        </div>
                        <div className="product_quantity">
                            <span>수량을 선택해주세요:</span>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product[idx.current].pd_mount}
                            />
                        </div>
                        <hr />
                        <div className="total_price">
                            총 상품금액(수량): {(product[idx.current].pd_price * quantity).toLocaleString()}원 ({quantity}개)
                        </div>
                        <div className="pay_btn">
                            <button onClick={addCart} className="custom_button">
                                장바구니
                            </button>
                            <button onClick={buyDirect} className="custom_button">
                                바로구매
                            </button>
                        </div>
                    </div>
                </div>
                <div className="imgArray">
                    {productImages.slice(0, 4).map((src, index) => (
                        <img
                            key={index}
                            className="sampleImage"
                            src={src}
                            alt={`Product ${index}`}
                            onClick={() => handleImageClick(src)}
                        />
                    ))}
                </div>
                <br />
                <hr />
                <br />
                <h1>상품 상세</h1>
                <div className="box_btm">
                    <img className="btm_img" src={`/images/shop/product_default_${pd_category}.jpg`} alt="Product detail" />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Product;