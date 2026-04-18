import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { products } from '../data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#FAF7F2' }}>
      <div style={{
        background: '#1C1008',
        padding: '60px 0',
        textAlign: 'center',
        marginBottom: '64px'
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '5px',
          color: '#C9A84C',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          Anti Tarnish Jewellery
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '52px',
          color: '#FAF7F2',
          fontWeight: 300
        }}>
          Our Collections
        </h1>
      </div>

      <div className="container">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <span style={{ color: '#9A7B5C', fontSize: '14px' }}>
            {filtered.length} products
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '8px 16px',
              border: '1px solid #E8DDD0',
              background: '#FAF7F2',
              fontSize: '13px',
              fontFamily: 'Jost, sans-serif',
              color: '#3D2B1F',
              cursor: 'pointer'
            }}
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '80px'
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
