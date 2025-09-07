import React, { useEffect, useState } from 'react';
import ChallengeArrayMapMidUICode from './ChallengeArrayMapMidUICode';

interface Product {
  id: number;
  name: string;
  price: number;
}

// Componente hijo para mostrar un solo producto
const ProductItem = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => (
  <li
    style={{
      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
      padding: '8px',
    }}
  >
    <strong>{product.name}</strong> - ${product.price}
  </li>
);

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Mouse', price: 25 },
      { id: 3, name: 'Keyboard', price: 75 },
      { id: 4, name: 'Monitor', price: 300 },
    ]);
  }, []);

  return (
    <div>
      <h2>Productos y su índice</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default function ChallengeArrayMapMid() {
  return (
    <>
      <ProductList />
      <ChallengeArrayMapMidUICode />
    </>
  );
}
