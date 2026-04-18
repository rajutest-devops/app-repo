import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeColors = {
    bestseller: { bg: '#C9A84C', text: '#1C1008' },
    new: { bg: '#2D6A4F', text: '#FAF7F2' },
    sale: { bg: '#8B1A1A', text: '#FAF7F2' }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FAF7F2',
        border: '1px solid #E8DDD0',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer'
      }}
    >
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />

          {product.badge && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: badgeColors[product.badge].bg,
              color: badgeColors[product.badge].text,
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              fontFamily: 'Jost, sans-serif'
            }}>
              {product.badge}
            </div>
          )}

          {discount > 0 && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#1C1008',
              color: '#C9A84C',
              fontSize: '11px',
              padding: '4px 8px'
            }}>
              -{discount}%
            </div>
          )}

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(28, 16, 8, 0.85)',
            padding: '16px',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease'
          }}>
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                background: added ? '#2D6A4F' : '#C9A84C',
                color: '#1C1008',
                border: 'none',
                padding: '12px',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Jost, sans-serif',
                transition: 'background 0.3s',
                fontWeight: '500'
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{
            fontSize: '11px',
            color: '#9A7B5C',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            {product.category}
          </div>

          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '18px',
            color: '#1C1008',
            marginBottom: '8px',
            fontWeight: 400
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {[1,2,3,4,5].map(star => (
              <span key={star} style={{
                color: star <= Math.round(product.rating) ? '#C9A84C' : '#E8DDD0',
                fontSize: '12px'
              }}>★</span>
            ))}
            <span style={{ fontSize: '11px', color: '#9A7B5C', marginLeft: '4px' }}>
              ({product.reviews})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '22px',
              color: '#1C1008',
              fontWeight: 600
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span style={{
              fontSize: '14px',
              color: '#9A7B5C',
              textDecoration: 'line-through'
            }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
