import React, { useEffect, useState } from 'react';
import ChallengeArrayMapLowUICode from './ChallengeArrayMapLowUICode';

interface Products {
  id: number;
  name: string;
  price: number;
}

export default function ChallengeArrayMapLow() {
  // Array de objetos en el estado
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Mouse', price: 25 },
      { id: 3, name: 'Keyboard', price: 75 },
    ]);
  }, []);

  return (
    <>
      <div>
        <h2>Productos disponibles</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
      <ChallengeArrayMapLowUICode />
    </>
  );
}
