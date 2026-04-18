import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1C1008 0%, #3D2B1F 50%, #1C1008 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '5px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              Premium Anti Tarnish Jewellery
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '72px',
              color: '#FAF7F2',
              lineHeight: 1.1,
              marginBottom: '24px',
              fontWeight: 300
            }}>
              Timeless<br/>
              <span style={{ color: '#C9A84C' }}>Elegance</span><br/>
              Redefined
            </h1>

            <p style={{
              color: '#9A7B5C',
              fontSize: '16px',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '420px'
            }}>
              Crafted with love, designed to last. Our anti tarnish jewellery
              stays beautiful through every moment — from morning chai to
              midnight celebrations.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/products">
                <button className="btn-primary">Shop Now</button>
              </Link>
              <Link to="/products?cat=combos">
                <button className="btn-outline" style={{ color: '#E8D5A3', borderColor: '#E8D5A3' }}>
                  View Combos
                </button>
              </Link>
            </div>

            <div style={{
              display: 'flex',
              gap: '40px',
              marginTop: '60px',
              borderTop: '1px solid rgba(201, 168, 76, 0.2)',
              paddingTop: '32px'
            }}>
              {[
                { number: '500+', label: 'Happy Customers' },
                { number: '100%', label: 'Anti Tarnish' },
                { number: '50+', label: 'Designs' }
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '32px',
                    color: '#C9A84C'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9A7B5C', letterSpacing: '1px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div style={{ gridColumn: '1 / -1', borderRadius: '4px', overflow: 'hidden', height: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
                alt="Pearl necklace"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', height: '180px' }}>
              <img
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400"
                alt="Bracelets"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', height: '180px' }}>
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"
                alt="Earrings"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
