import React from 'react';
import ItemList from '../components/itemList';
import { useAuth } from '../utils/auth';

export default function HomePage() {
  const { items = [] } = useAuth();

  return (
    <div>
      <h1>Welcome to Campus MarketPlace</h1>
      <ItemList items={items} />
    </div>
  );
}
