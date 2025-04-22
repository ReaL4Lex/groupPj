import React, { useState } from 'react';
import Link from 'next/link';

const ItemCard = ({ item }) => {
  const [message, setMessage] = useState('');

  const handleBuy = () => {
    alert('Thank you for your interest! The buying functionality is not implemented yet.');
  };

  const handleSendMessage = () => {
    alert('Message sent to ' + item.username + ': ' + message);
    setMessage('');
  };

  return (
    <div className="item-card">
      <Link href={'/item/' + item.id}>
        <h2>{item.title}</h2>
        {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: '150px', marginBottom: '1rem' }} />}
        <p>{item.description}</p>
        <strong>${item.price}</strong>
      </Link>
      <p className="seller-info">Seller: {item.username}</p>
      <p className="seller-info">Department: {item.department || 'N/A'}</p>
      <button className="buy-button" onClick={handleBuy}>Buy</button>
      <div className="message-section">
        <textarea
          className="message-textarea"
          placeholder="Write a message to the seller"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <button className="send-message-button" onClick={handleSendMessage} disabled={!message.trim()}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
