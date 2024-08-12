import React, { useState, useEffect } from 'react';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/all-orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ` ${localStorage.getItem("authToken")}` // Include authorization header if required
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Order ID</th>
                <th className="py-3 px-4 border-b text-left">Customer</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Address</th>
                <th className="py-3 px-4 border-b text-left">Order Date</th>
                <th className="py-3 px-4 border-b text-left">Payment Method</th>
                <th className="py-3 px-4 border-b text-left">Subtotal</th>
                <th className="py-3 px-4 border-b text-left">Order Notes</th>
                <th className="py-3 px-4 border-b text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-3 px-4 border-b">{order._id}</td>
                  <td className="py-3 px-4 border-b">{order.firstName} {order.lastName}</td>
                  <td className="py-3 px-4 border-b">{order.email}</td>
                  <td className="py-3 px-4 border-b">{order.address}, {order.state}, {order.country}</td>
                  <td className="py-3 px-4 border-b">{new Date(order.date).toLocaleString()}</td>
                  <td className="py-3 px-4 border-b">{order.paymentMethod}</td>
                  <td className="py-3 px-4 border-b">${order.subtotal.toFixed(2)}</td>
                  <td className="py-3 px-4 border-b">{order.orderNotes || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">
                    <ul className="list-disc list-inside">
                      {order.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity} - ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
