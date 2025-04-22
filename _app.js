import '../assets/styles/globals.css';
import { AuthProvider } from '../utils/auth.js';
import ProtectedRoute from '../utils/ProtectedRoute.js';
import NavBar from '../components/navBar.js';
import Footer from '../components/footer.js';

const protectedRoutes = ['/sell', '/profile'];

export default function App({ Component, pageProps, router }) {
  const isProtected = protectedRoutes.includes(router.pathname);
  return (
    <AuthProvider>
      <NavBar />
      {isProtected ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </AuthProvider>
  );
}
