import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/css/shop/Product.css';

const categoryMap = {
    0: '위생용품',
    1: '사료 및 간식',
    2: '강아지 옷',
    3: '악세서리',
};

const Product = () => {
    const { pdNo } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/product/${pdNo}`);
                const data = await response.json();
                setProduct(data);
                setMainImage(`/public/product/${data.pdNo}/1.png`);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [pdNo]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value < 1 || value > product.pdMount) {
            alert(`최대 주문 가능 수량을 확인해주세요. 재고갯수: ${product.pdMount}`);
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };
    const addCart = () => {
        alert('gdgd');
    };
    const handleImageClick = (src) => {
        setMainImage(src);
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const productImages = [
        `/public/product/${product.pdNo}/1.png`,
        `/public/product/${product.pdNo}/2.png`,
        `/public/product/${product.pdNo}/3.png`,
        `/public/product/${product.pdNo}/4.png`,
        `/public/product/${product.pdNo}/5.png`,
    ];

    return (
        <div className="product_container">
            <h1>상품 페이지</h1>
            <div className="product_box">
                <div className="box_top">
                    <div>
                        <img className="mainImage" src={mainImage} alt="Main product" />
                    </div>
                    <div className="product_text">
                        <div className="product_title">{product.pdName}</div>
                        <div className="product_price">{product.pdPrice.toLocaleString()}원</div>
                        <hr />
                        <div className="product_details">
                            <div>설명 : {product.pdExplain}</div>
                            <div>등록일 : {new Date(product.pdRegistrationDate).toLocaleDateString()}</div>
                            <div>카테고리 : {categoryMap[product.pdCategory]}</div>
                        </div>
                        <div className="product_quantity">
                            <span>수량을 선택해주세요:</span>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product.pdMount}
                            />
                        </div>
                        <hr />
                        <div className="total_price">
                            총 상품금액(수량): {(product.pdPrice * quantity).toLocaleString()}원 ({quantity}개)
                        </div>
                        <div className="pay_btn">
                            <button onClick={addCart} className="custom_button">
                                장바구니
                            </button>
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
