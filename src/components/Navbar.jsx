import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(28, 16, 8, 0.97)' : 'transparent',
      transition: 'all 0.4s ease',
      padding: scrolled ? '12px 0' : '20px 0',
      borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.2)' : 'none'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '22px',
              color: '#C9A84C',
              letterSpacing: '2px',
              lineHeight: 1.2
            }}>
              The Pair of Pearls
            </div>
            <div style={{
              fontSize: '9px',
              color: '#9A7B5C',
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              Anti Tarnish Jewellery
            </div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/products', label: 'Collections' },
            { path: '/products?cat=combos', label: 'Combos' }
          ].map(link => (
            <Link
              key={link.label}
              to={link.path}
              style={{
                color: location.pathname === link.path ? '#C9A84C' : '#E8D5A3',
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
          <div style={{
            color: '#E8D5A3',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={{
                background: '#C9A84C',
                color: '#1C1008',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '600',
                position: 'absolute',
                top: '-6px',
                right: '-6px'
              }}>
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
