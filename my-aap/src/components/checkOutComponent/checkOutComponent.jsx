import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext/cartContext';

const Checkout = () => {
  const { cartItems = [] } = useCart(); // Default to empty array

  const [billingDetails, setBillingDetails] = useState({
    country: '',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    apartment: '',
    state: '',
    postal: '',
    phone: '',
    email: '',
    orderNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [subtotal, setSubtotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false); // State for success message

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + item.product.price * item.quantity;
      }
      console.error('Invalid item:', item); // Log invalid items
      return acc;
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [id]: value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      ...billingDetails,
      cartItems: cartItems.map((item) => ({
        productId: item._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: subtotal,
      paymentMethod: paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` ${localStorage.getItem("authToken")}` // Include authorization header
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderPlaced(true); // Show success message
        // Optionally, clear the cart or redirect the user
      } else {
        alert('Failed to place order: ' + data.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Billing Details */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={billingDetails.firstName}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={billingDetails.lastName}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="companyName"
              placeholder="Company Name (Optional)"
              value={billingDetails.companyName}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={billingDetails.country}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="address"
              placeholder="Street Address"
              value={billingDetails.address}
              onChange={handleChange}
              required
              className="p-2 border rounded col-span-2"
            />
            <input
              type="text"
              id="apartment"
              placeholder="Apartment, suite, unit, etc. (Optional)"
              value={billingDetails.apartment}
              onChange={handleChange}
              className="p-2 border rounded col-span-2"
            />
            <input
              type="text"
              id="state"
              placeholder="State"
              value={billingDetails.state}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="postal"
              placeholder="Postal Code"
              value={billingDetails.postal}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={billingDetails.phone}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={billingDetails.email}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <textarea
              id="orderNotes"
              placeholder="Order Notes (Optional)"
              value={billingDetails.orderNotes}
              onChange={handleChange}
              className="p-2 border rounded col-span-2"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-semibold mt-6">
            Place Order
          </button>
        </form>
      </div>

      {/* Your Order */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-6">Your Order</h2>
        {/* Cart Items Display */}
        <div className="mb-6">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              item.product ? (
                <div key={item._id || index} className="flex justify-between mb-4">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ) : (
                <div key={index} className="flex justify-between mb-4">
                  <span>Invalid item</span>
                  <span>$0.00</span>
                </div>
              )
            ))
          )}
          {/* Subtotal and Total */}
          <div className="flex justify-between font-semibold mb-4">
            <span>Cart Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Order Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center mb-4">
            <input type="radio" id="bank-transfer" name="payment-method" value="Bank Transfer" className="mr-2" onChange={handlePaymentMethodChange} />
            <label htmlFor="bank-transfer">Direct Bank Transfer</label>
          </div>
          <div className="flex items-center mb-4">
            <input type="radio" id="cheque-payment" name="payment-method" value="Cheque Payment" className="mr-2" onChange={handlePaymentMethodChange} />
            <label htmlFor="cheque-payment">Cheque Payment</label>
          </div>
          <div className="flex items-center mb-4">
            <input type="radio" id="paypal" name="payment-method" value="Paypal" className="mr-2" onChange={handlePaymentMethodChange} defaultChecked />
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
      </div>

      {/* Success Pop-up */}
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <button
              onClick={() => setOrderPlaced(false)}
              className="bg-black text-white p-3 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
