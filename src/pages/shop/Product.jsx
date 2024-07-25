import React, { useState } from 'react';
import '../../components/css/shop/Product.css';

const Product = () => {
    const productImages = [
        '/src/images/shop/doggoods00.png',
        '/src/images/shop/doggoods01.png',
        '/src/images/shop/doggoods02.png',
        '/src/images/shop/doggoods03.png',
        '/src/images/shop/doggoods00detail.png',
    ];

    const [mainImage, setMainImage] = useState(productImages[0]);
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
    };
    const handleImageClick = (src) => {
        setMainImage(src);
    };

    return (
        <div className="product_container">
            <h1>상품 페이지</h1>
            <div className="product_box">
                <div className="box_top">
                    <div>
                        <img className="mainImage" src={mainImage} alt="Main product" />
                    </div>
                    <div className="product_text">
                        <div className="product_title">KH 브랜드 신상품 고급 소재 목줄</div>
                        <div className="product_price">24,000원</div>
                        <hr />
                        <div className="product_details">
                            <div>제조사 : KH Design</div>
                            <div>유통사 : 댕트립</div>
                            <div>발매일 : 24년 10월</div>
                            <div>재질 : 고급소재</div>
                        </div>
                        <div className="product_quantity">
                            <span>수량을 선택해주세요:</span>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1" // 최소값 설정
                            />
                        </div>
                        <hr />
                        <div className="total_price">총 상품금액(수량): 48,000원 (2개)</div>
                        <div className="pay_btn">
                            <button className="custom_button">장바구니</button>
                            <button className="custom_button">바로구매</button>
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
                    <img className="btm_img" src={productImages[4]} alt="Product detail" />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Product;
