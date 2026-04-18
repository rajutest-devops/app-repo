import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return (
    <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '80vh' }}>
      <h2>Product not found</h2>
      <Link to="/products" style={{ color: '#C9A84C' }}>Back to collections</Link>
    </div>
  );

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ paddingTop: '100px', background: '#FAF7F2', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ fontSize: '13px', color: '#9A7B5C', marginBottom: '32px' }}>
          <Link to="/" style={{ color: '#9A7B5C' }}>Home</Link>
          {' / '}
          <Link to="/products" style={{ color: '#9A7B5C' }}>Collections</Link>
          {' / '}
          <span style={{ color: '#1C1008' }}>{product.name}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          marginBottom: '80px'
        }}>
          <div>
            <div style={{ height: '480px', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: '80px',
                      height: '80px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImage === i ? '2px solid #C9A84C' : '1px solid #E8DDD0'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              {product.category}
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '42px',
              color: '#1C1008',
              fontWeight: 400,
              marginBottom: '16px'
            }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', alignItems: 'center' }}>
              {[1,2,3,4,5].map(star => (
                <span key={star} style={{
                  color: star <= Math.round(product.rating) ? '#C9A84C' : '#E8DDD0',
                  fontSize: '16px'
                }}>★</span>
              ))}
              <span style={{ fontSize: '13px', color: '#9A7B5C', marginLeft: '8px' }}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px' }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '36px',
                color: '#1C1008',
                fontWeight: 600
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '18px', color: '#9A7B5C', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span style={{
                background: '#2D6A4F',
                color: '#FAF7F2',
                fontSize: '12px',
                padding: '4px 10px',
                letterSpacing: '1px'
              }}>
                {discount}% OFF
              </span>
            </div>

            <p style={{ fontSize: '15px', color: '#3D2B1F', lineHeight: 1.9, marginBottom: '32px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#9A7B5C',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                Features
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.features.map(feat => (
                  <span key={feat} style={{
                    padding: '6px 16px',
                    border: '1px solid #E8DDD0',
                    fontSize: '13px',
                    color: '#3D2B1F'
                  }}>
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', border: '1px solid #E8DDD0', alignItems: 'center' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '44px', height: '44px', border: 'none',
                    background: 'transparent', fontSize: '18px',
                    cursor: 'pointer', color: '#1C1008'
                  }}
                >−</button>
                <span style={{ width: '44px', textAlign: 'center', fontSize: '16px' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '44px', height: '44px', border: 'none',
                    background: 'transparent', fontSize: '18px',
                    cursor: 'pointer', color: '#1C1008'
                  }}
                >+</button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: added ? '#2D6A4F' : '#1C1008',
                  color: added ? '#FAF7F2' : '#C9A84C',
                  border: 'none',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'Jost, sans-serif'
                }}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <div style={{
              background: '#F5EFE6',
              padding: '20px',
              fontSize: '13px',
              color: '#6B5344',
              lineHeight: 2
            }}>
              <div>✓ Free shipping on orders above ₹999</div>
              <div>✓ Anti tarnish guarantee — stays beautiful for years</div>
              <div>✓ Easy 7 day returns</div>
              <div>✓ COD available</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '32px' }}>
              You May Also Like
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px'
            }}>
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
