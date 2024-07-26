import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getUsers');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Profiles</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <h2>Name:{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contactNumber}</p>
            <p>Address: {user.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
