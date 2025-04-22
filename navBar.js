import Link from 'next/link';
import { useAuth } from '../utils/auth.js';

export default function NavBar() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      {user && <Link href="/sell">Sell</Link>}
      <Link href="/about">About</Link>
      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={auth.logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
