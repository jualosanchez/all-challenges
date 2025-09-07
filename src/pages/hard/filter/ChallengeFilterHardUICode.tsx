import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import React, { useEffect, useState } from 'react';
import ChallengeArrayMapHardUICode from './ChallengeArrayMapHardUICode';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [priceFilter, setPriceFilter] = useState(100);

  const filteredProducts = products.filter(
    (p) => p.price > priceFilter && p.inStock
  );

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Laptop', price: 1200, inStock: true },
      { id: 2, name: 'Mouse', price: 25, inStock: false },
      { id: 3, name: 'Keyboard', price: 75, inStock: true },
      { id: 4, name: 'Monitor', price: 300, inStock: true },
      { id: 5, name: 'Webcam', price: 50, inStock: false },
    ]);
  }, []);

  return (
    <div>
      <h2>Productos en stock de más de \${priceFilter}</h2>
      <label>
        Filtrar por precio mayor a:
        <input
          type="number"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
        />
      </label>
      <ul style={{ marginTop: '1rem' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - \${product.price}
            </li>
          ))
        ) : (
          <p>No se encontraron productos con estas características.</p>
        )}
      </ul>
    </div>
  );
};

export default function ChallengeArrayMapHard() {
  return (
    <>
      <ProductList />
      <ChallengeArrayMapHardUICode />
    </>
  );
}
`;

export default function ChallengeArrayMapHardUICode() {
  return (
    <CodeViewer
      code={codeString}
      title="Source Code: ChallengeArrayMapHard.tsx"
    />
  );
}
