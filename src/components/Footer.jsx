import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#1C1008',
      color: '#9A7B5C',
      padding: '64px 0 32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px'
        }}>
          <div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '24px',
              color: '#C9A84C',
              letterSpacing: '2px',
              marginBottom: '8px'
            }}>
              The Pair of Pearls
            </div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '4px',
              color: '#6B5344',
              marginBottom: '20px'
            }}>
              ANTI TARNISH JEWELLERY
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.8, maxWidth: '260px' }}>
              Handcrafted jewellery that stays beautiful through every moment of your life.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['Instagram', 'WhatsApp'].map(social => (
                <a key={social} href="#" style={{
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: '#C9A84C',
                  borderBottom: '1px solid rgba(201, 168, 76, 0.3)',
                  paddingBottom: '2px'
                }}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              Collections
            </div>
            {['Bracelets', 'Earrings', 'Necklaces', 'Hair Clips', 'Combos'].map(item => (
              <div key={item} style={{ marginBottom: '12px' }}>
                <Link to={`/products?cat=${item.toLowerCase().replace(' ', '')}`} style={{
                  fontSize: '14px',
                  color: '#9A7B5C',
                  textDecoration: 'none'
                }}>
                  {item}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              Info
            </div>
            {['About Us', 'Care Guide', 'Size Guide', 'Returns', 'Track Order'].map(item => (
              <div key={item} style={{ marginBottom: '12px' }}>
                <a href="#" style={{ fontSize: '14px', color: '#9A7B5C', textDecoration: 'none' }}>
                  {item}
                </a>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              Contact
            </div>
            <div style={{ fontSize: '14px', lineHeight: 2 }}>
              <div>WhatsApp Orders</div>
              <div style={{ color: '#C9A84C' }}>+91 XXXXX XXXXX</div>
              <div style={{ marginTop: '12px' }}>Email</div>
              <div style={{ color: '#C9A84C' }}>hello@pairofpearls.in</div>
              <div style={{ marginTop: '12px' }}>Ships across India</div>
              <div style={{ color: '#C9A84C' }}>Free above ₹999</div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(201, 168, 76, 0.15)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px'
        }}>
          <span>© 2024 The Pair of Pearls. All rights reserved.</span>
          <span style={{ color: '#6B5344' }}>Made with love in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
