import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth';
import dynamic from 'next/dynamic';

const SellForm = dynamic(() => import('../components/sellForm'), {
  loading: () => <p>Loading...</p>,
});

const Profile = () => {
  const { user, items, updateItem, updateUser, deleteItem } = useAuth();
  const [editingUser, setEditingUser] = useState(false);
  const [userForm, setUserForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    password: '',
  });
  const [editingItemId, setEditingItemId] = useState(null);

  // Show profile info and items even if user is not logged in
  // If user is logged out, show a message and still display items posted by the last user in localStorage
  const displayUser = user || JSON.parse(localStorage.getItem('user')) || null;

  // Filter items posted by the displayed user
  const userItems = items.filter(item => displayUser && item.username === displayUser.name && item.username && item.username !== 'sample');

  const handleUserChange = e => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSave = e => {
    e.preventDefault();
    const updatedUser = { ...userForm };
    if (!userForm.password) {
      delete updatedUser.password;
    }
    updateUser(updatedUser);
    setEditingUser(false);
  };

  const handleEditItem = id => {
    setEditingItemId(id);
  };

  const handleSaveItem = (id, updatedData) => {
    updateItem(id, updatedData);
    setEditingItemId(null);
  };

  const handleCancelEditItem = () => {
    setEditingItemId(null);
  };

  if (!displayUser) return <p>No user profile to display. Please log in.</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!editingUser ? (
        <div className="user-info">
          <p><strong>Name:</strong> {displayUser.name}</p>
          <p><strong>Department:</strong> {displayUser.department}</p>
          <p><strong>Email:</strong> {displayUser.email}</p>
          {user && <button onClick={() => setEditingUser(true)}>Edit Profile</button>}
        </div>
      ) : (
        <form onSubmit={handleUserSave} className="form-container">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" value={userForm.name} onChange={handleUserChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input id="department" name="department" value={userForm.department} onChange={handleUserChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" value={userForm.email} onChange={handleUserChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" value={userForm.password} onChange={handleUserChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingUser(false)}>Cancel</button>
        </form>
      )}

      <h3>Your Items</h3>
      {userItems.length === 0 && <p>You have not posted any items yet.</p>}
      {userItems.map(item => (
        <div key={item.id} className="user-item">
          {editingItemId === item.id && user ? (
            <SellForm
              initialData={item}
              onSave={(updatedData) => handleSaveItem(item.id, updatedData)}
              onCancel={handleCancelEditItem}
            />
          ) : (
            <div>
              <h4>{item.title}</h4>
              {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: '200px', marginBottom: '1rem' }} />}
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              {user && (
                <>
                  <button onClick={() => handleEditItem(item.id)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
