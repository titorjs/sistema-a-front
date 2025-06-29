import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import keycloak from '../api/keycloack'; // debe exportar solo el objeto Keycloak

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (authenticated) {
        localStorage.setItem('token', keycloak.token);
        localStorage.setItem('refreshToken', keycloak.refreshToken);
        localStorage.setItem('username', keycloak.tokenParsed?.preferred_username);
        localStorage.setItem('email', keycloak.tokenParsed?.email);

        console.log('Autenticado con Keycloak');
        navigate('/productos');
      } else {
        console.warn('No autenticado');
      }
    });
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h3>Redirigiendo a Keycloak para iniciar sesión...</h3>
    </div>
  );
};

export default LoginPage;
