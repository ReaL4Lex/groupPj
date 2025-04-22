import { useRouter } from 'next/router';
import { useAuth } from '../../utils/auth';

export default function ItemDetailPage() {
  const { query } = useRouter();
  const auth = useAuth();

  if (!auth) return null;
  const { items } = auth;
  const item = items.find(i => i.id === Number(query.id));

  if (!item) return <p>Item not found.</p>;
  return (
    <div>
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} />
      <p>{item.description}</p>
      <strong>${item.price}</strong>
    </div>
  );
}
