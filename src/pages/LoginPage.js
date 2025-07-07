import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const LoginPage = () => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/productos');
    }
  }, [authenticated]);

  return (
    <div className="container mt-5 text-center">
      <h3>Redirigiendo a Keycloak para iniciar sesión...</h3>
    </div>
  );
};

export default LoginPage;
