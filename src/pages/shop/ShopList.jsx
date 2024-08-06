import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../../components/css/shop/ShopList.css';

const categoryMap = {
    0: '위생용품',
    1: '사료 및 간식',
    2: '강아지 옷',
    3: '악세서리',
};

const categoryReverseMap = {
    위생용품: 0,
    '사료 및 간식': 1,
    '강아지 옷': 2,
    악세서리: 3,
    전체: '전체',
};

const ShopList = () => {
    const { category } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || '전체');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/productList'); // 백엔드 서버 주소
                const data = await response.json(); // 응답 데이터 확인
                console.log(data);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        if (category) {
            setSelectedCategory(categoryMap[category]);
        }
    }, [category]);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredProducts =
        selectedCategory === '전체'
            ? products
            : products.filter((product) => categoryMap[product.pdCategory] === selectedCategory);

    return (
        <div className="product_list_container">
            <h1>카테고리</h1>
            <div className="category_buttons">
                <button className="category_button" onClick={() => handleCategoryClick('위생용품')}>
                    위생용품
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('사료 및 간식')}>
                    사료 및 간식
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('강아지 옷')}>
                    강아지 옷
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('악세서리')}>
                    악세서리
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('전체')}>
                    전체
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading products: {error.message}</p>
            ) : (
                <div className="product_grid">
                    {filteredProducts.map((product) => (
                        <Link to={`/shop/product/${product.pdNo}`} key={product.pdNo}>
                            <div className="product_card">
                                <img
                                    className="product_image"
                                    src={`/public/product/${product.pdNo}/1.png`}
                                    alt={product.pdName}
                                />
                                <div className="product_info">
                                    <h2 className="product_name">{product.pdName}</h2>
                                    <p className="product_price">{product.pdPrice.toLocaleString()}원</p>
                                    <p className="product_discount">{product.pdDiscount}%</p>
                                    <p className="product_explain">{product.pdExplain}</p>
                                    <p className="product_mount">{product.pdMount} 개</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopList;
