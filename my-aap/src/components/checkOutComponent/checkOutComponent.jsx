import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        console.log('Auth Token:', authToken); // Debug token value
        
        if (!authToken) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('http://localhost:5000/api/cart/all', {
          headers: { Authorization: ` ${authToken}` } // Corrected Authorization header
        });

        console.log('API Response:', response.data); // Debug API response

        const fetchedCartItems = response.data.items || []; // Access items correctly

        if (!Array.isArray(fetchedCartItems)) {
          throw new Error('Cart items data is not an array.');
        }

        setCartItems(fetchedCartItems);

        // Calculate subtotal
        const total = fetchedCartItems.reduce((acc, item) => {
          if (item.product && item.product.price) {
            return acc + item.product.price * item.quantity;
          }
          console.error('Invalid item or missing product price:', item); // More detailed logging
          return acc;
        }, 0);
        setSubtotal(total);

      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.response?.data?.msg || error.message || 'Error fetching cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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
        productId: item.product._id,
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
          'Authorization': ` ${localStorage.getItem("authToken")}` // Corrected Authorization header
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!'); // Display success toast
        // Optionally, clear the cart or redirect the user
      } else {
        toast.error('Failed to place order: ' + data.message); // Display error toast
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message); // Display error toast
    }
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading cart items...</div>;
  }

  if (error) {
    return <div className="text-center text-xl mt-10 text-red-500">{error}</div>;
  }

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
            <input type="radio" id="paypal" name="payment-method" value="Paypal" className="mr-2" onChange={handlePaymentMethodChange} checked />
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
