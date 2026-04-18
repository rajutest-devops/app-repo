import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featured = products.filter(p => p.badge === 'bestseller').slice(0, 4);

  return (
    <div>
      <Hero />

      <section style={{ padding: '100px 0', background: '#FAF7F2' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{
              fontSize: '11px',
              letterSpacing: '5px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Why Choose Us
            </div>
          </div>
          <h2 className="section-title">The Pair of Pearls Promise</h2>
          <div className="divider"><div className="divider-dot"/></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginTop: '48px'
          }}>
            {[
              { icon: '◇', title: 'Anti Tarnish', desc: 'Guaranteed to stay beautiful for years' },
              { icon: '◈', title: 'Handcrafted', desc: 'Each piece made with care and precision' },
              { icon: '◎', title: 'Hypoallergenic', desc: 'Safe for sensitive skin' },
              { icon: '◉', title: 'Free Shipping', desc: 'On all orders above ₹999' }
            ].map(item => (
              <div key={item.title} style={{
                textAlign: 'center',
                padding: '32px 24px',
                border: '1px solid #E8DDD0'
              }}>
                <div style={{ fontSize: '32px', color: '#C9A84C', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  marginBottom: '8px',
                  color: '#1C1008'
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', color: '#9A7B5C', lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#F5EFE6' }}>
        <div className="container">
          <h2 className="section-title">Bestsellers</h2>
          <p className="section-subtitle">Loved by our customers</p>
          <div className="divider"><div className="divider-dot"/></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginTop: '48px'
          }}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/products">
              <button className="btn-outline">View All Collections</button>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: '#1C1008', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            fontSize: '11px',
            letterSpacing: '5px',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            Special Collections
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '56px',
            color: '#FAF7F2',
            fontWeight: 300,
            marginBottom: '24px'
          }}>
            Bridal & Occasion Sets
          </h2>
          <p style={{
            color: '#9A7B5C',
            fontSize: '16px',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: 1.8
          }}>
            Complete jewellery sets for your most precious moments.
            Anti tarnish guaranteed — looking beautiful in every photo.
          </p>
          <Link to="/products?cat=combos">
            <button className="btn-primary">Explore Combos</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
