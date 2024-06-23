import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState(null);

  const buyProduct = async (productId) => {
    const response = await axios.post('http://localhost:5000/api/buy', { productId });
    alert('Purchase completed!');
  };

  const fetchProduct = async (productId) => {
    const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
    setProduct(response.data);
  };

  return (
    <div>
      <h1>EC Site</h1>
      <button onClick={() => fetchProduct(1)}>Get Product A</button>
      <button onClick={() => fetchProduct(2)}>Get Product B</button>
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