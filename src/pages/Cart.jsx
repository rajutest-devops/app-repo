import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  if (items.length === 0) return (
    <div style={{
      paddingTop: '160px',
      textAlign: 'center',
      minHeight: '80vh',
      background: '#FAF7F2'
    }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '48px',
        color: '#1C1008',
        marginBottom: '16px'
      }}>
        Your cart is empty
      </div>
      <p style={{ color: '#9A7B5C', marginBottom: '32px' }}>
        Discover our beautiful collections
      </p>
      <Link to="/products">
        <button className="btn-primary">Shop Now</button>
      </Link>
    </div>
  );

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#FAF7F2' }}>
      <div className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '48px',
          color: '#1C1008',
          fontWeight: 400,
          marginBottom: '48px'
        }}>
          Shopping Cart ({items.length} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
          <div>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '24px',
                padding: '24px 0',
                borderBottom: '1px solid #E8DDD0',
                alignItems: 'center'
              }}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />

                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#9A7B5C',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {item.category}
                  </div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '20px',
                    color: '#1C1008',
                    marginBottom: '12px'
                  }}>
                    {item.name}
                  </div>

                  <div style={{ display: 'flex', border: '1px solid #E8DDD0', width: 'fit-content' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '36px', height: '36px', border: 'none',
                        background: 'transparent', cursor: 'pointer', fontSize: '16px'
                      }}
                    >−</button>
                    <span style={{
                      width: '36px', height: '36px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: '14px'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '36px', height: '36px', border: 'none',
                        background: 'transparent', cursor: 'pointer', fontSize: '16px'
                      }}
                    >+</button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '22px',
                    color: '#1C1008',
                    marginBottom: '12px'
                  }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none', border: 'none',
                      color: '#9A7B5C', fontSize: '12px',
                      letterSpacing: '1px', cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{
              background: '#F5EFE6',
              padding: '32px',
              position: 'sticky',
              top: '120px'
            }}>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                color: '#1C1008',
                marginBottom: '24px',
                fontWeight: 400
              }}>
                Order Summary
              </h3>

              <div style={{ borderBottom: '1px solid #E8DDD0', paddingBottom: '16px', marginBottom: '16px' }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: '#3D2B1F',
                    marginBottom: '8px'
                  }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '14px', color: '#3D2B1F' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#2D6A4F' : '#1C1008' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div style={{
                    background: '#E8DDD0',
                    padding: '10px',
                    fontSize: '12px',
                    color: '#6B5344',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for FREE shipping
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E8DDD0',
                  paddingTop: '16px',
                  marginBottom: '24px'
                }}>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '20px',
                    fontWeight: 600
                  }}>Total</span>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '20px',
                    fontWeight: 600
                  }}>
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '13px' }}
              >
                Proceed to Checkout
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '12px',
                color: '#9A7B5C'
              }}>
                <div>Secure checkout via Razorpay</div>
                <div style={{ marginTop: '4px' }}>UPI · Cards · Net Banking · COD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
