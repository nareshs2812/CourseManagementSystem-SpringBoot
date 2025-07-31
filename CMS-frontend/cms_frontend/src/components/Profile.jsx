import React, { useEffect, useState } from 'react';
import '../styles/MyProfileAdmin.css';
import Header from './Header';

function MyProfileAdmin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
    <Header/>
    <div className="my-profile-container">
      <h2 className="my-profile-heading">Admin Profile</h2>
      {user ? (
        <div>
          <p className="my-profile-item">
            <span className="my-profile-label">User ID:</span> {user.id}
          </p>
          <p className="my-profile-item">
            <span className="my-profile-label">Username:</span> {user.userName}
          </p>
          <p className="my-profile-item">
            <span className="my-profile-label">Email:</span> {user.email}
          </p>
          <p className="my-profile-item">
            <span className="my-profile-label">Role:</span> {user.role}
          </p>
        </div>
      ) : (
        <p className="my-profile-loading">Loading profile...</p>
      )}
    </div>
    </>
  );
}

export default MyProfileAdmin;
