// keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'sistema-a-b',
  clientId: 'front-a'
});

// Controlador de inicialización
let initialized = false;

const initKeycloak = () => {
  return new Promise((resolve, reject) => {
    if (initialized) {
      resolve(keycloak);
      return;
    }

    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      if (authenticated) {
        localStorage.setItem('token', keycloak.token);
        localStorage.setItem('refreshToken', keycloak.refreshToken);

        // Renovación automática
        setInterval(() => {
          keycloak.updateToken(60).then((refreshed) => {
            if (refreshed) {
              localStorage.setItem('token', keycloak.token);
              localStorage.setItem('refreshToken', keycloak.refreshToken);
            }
          }).catch(() => {
            console.warn('Token expirado. Cerrando sesión...');
            keycloak.logout({ redirectUri: window.location.origin });
          });
        }, 60000);

        initialized = true;
        resolve(keycloak);
      } else {
        reject("No autenticado");
      }
    }).catch(reject);
  });
};

export { keycloak, initKeycloak };