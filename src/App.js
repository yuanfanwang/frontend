import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const userId = 1; // 例として固定のユーザーIDを使用

  const buyProduct = async (productId) => {
    try {
      await axios.post('http://localhost:5001/api/buy', { 
        user_id: userId,
        product_id: productId
      });
      alert('Purchase completed!');
    } catch (error) {
      console.error('Error buying product:', error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchRecommendationProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5004/api/recommend_products', { user_id: userId });
      setRecommendedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    }
  };

  return (
    <div>
      <h1>EC Site</h1>
      <button onClick={fetchRecommendationProducts}>Get Recommended Products</button>
      {recommendedProducts.length > 0 && (
        <div>
          <button onClick={() => fetchProduct(recommendedProducts[0].id)}>Get {recommendedProducts[0].name}</button>
          <button onClick={() => fetchProduct(recommendedProducts[1].id)}>Get {recommendedProducts[1].name}</button>
        </div>
      )}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={() => buyProduct(product.id)}>Buy</button>
        </div>
      )}
    </div>
  );
}

export default App;