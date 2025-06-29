// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'sistema-a-b',
  clientId: 'front-a'
});

export default keycloak;
