import React from 'react';
import { categories } from '../data/products';

const CategoryFilter = ({ active, onChange }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '48px'
    }}>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          style={{
            padding: '10px 24px',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            border: '1px solid',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: 'Jost, sans-serif',
            background: active === cat.id ? '#1C1008' : 'transparent',
            color: active === cat.id ? '#C9A84C' : '#3D2B1F',
            borderColor: active === cat.id ? '#1C1008' : '#E8DDD0'
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
