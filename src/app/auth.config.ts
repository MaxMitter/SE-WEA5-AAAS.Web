import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  clientId: 'spa-demo',
  redirectUri: window.location.origin + '/index.html',
  scope: 'openid profile email voucher',
};
