// src/pages/LogoutPage.js
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // 🧹 limpia y redirige
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h3>Cerrando sesión...</h3>
    </div>
  );
};

export default LogoutPage;
