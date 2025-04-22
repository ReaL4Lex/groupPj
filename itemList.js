// Folder: /components/ItemList.js
import ItemCard from './itemCard';
export default function ItemList({ items = [] }) {
  return (
    <div className="item-grid">
      {items.map(item => <ItemCard key={item.id} item={item} />)}
    </div>
  );
}
