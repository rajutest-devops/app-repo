import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_YOUR_KEY',
      amount: total * 100,
      currency: 'INR',
      name: 'The Pair of Pearls',
      description: `Order of ${items.length} item(s)`,
      handler: function(response) {
        clearCart();
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        navigate('/');
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone
      },
      theme: { color: '#C9A84C' }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Add your Razorpay key in .env file as REACT_APP_RAZORPAY_KEY');
    }

    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E8DDD0',
    background: '#FAF7F2',
    fontSize: '14px',
    fontFamily: 'Jost, sans-serif',
    color: '#1C1008',
    marginBottom: '16px',
    outline: 'none'
  };

  const labelStyle = {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#9A7B5C',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px'
  };

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
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
          <div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '24px',
              color: '#1C1008',
              fontWeight: 400,
              marginBottom: '24px'
            }}>
              Delivery Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX" style={inputStyle}/>
              </div>
            </div>

            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="your@email.com" style={inputStyle}/>

            <label style={labelStyle}>Address *</label>
            <input name="address" value={form.address} onChange={handleChange}
              placeholder="Street address, apartment, area" style={inputStyle}/>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>City *</label>
                <input name="city" value={form.city} onChange={handleChange}
                  placeholder="City" style={{ ...inputStyle, marginBottom: 0 }}/>
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input name="state" value={form.state} onChange={handleChange}
                  placeholder="State" style={{ ...inputStyle, marginBottom: 0 }}/>
              </div>
              <div>
                <label style={labelStyle}>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange}
                  placeholder="6 digit PIN" style={{ ...inputStyle, marginBottom: 0 }}/>
              </div>
            </div>
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
                fontSize: '22px',
                marginBottom: '20px',
                color: '#1C1008',
                fontWeight: 400
              }}>
                Order Summary
              </h3>

              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px',
                  alignItems: 'center'
                }}>
                  <img src={item.images[0]} alt={item.name}
                    style={{ width: '56px', height: '56px', objectFit: 'cover' }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#1C1008' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#9A7B5C' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: '14px', color: '#1C1008' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '16px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6B5344' }}>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#6B5344' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#2D6A4F' : '#1C1008' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E8DDD0',
                  paddingTop: '16px',
                  marginBottom: '24px',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '20px',
                  fontWeight: 600
                }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '16px' }}
              >
                {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '11px',
                color: '#9A7B5C',
                letterSpacing: '1px'
              }}>
                SECURED BY RAZORPAY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
