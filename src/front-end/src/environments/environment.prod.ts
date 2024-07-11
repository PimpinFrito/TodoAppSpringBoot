export const environment = {
  production: false,

  auth_config: {
    domain: '<your-auth0-domain>',
    clientId: '<your-client-id>',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'todoapp.api',
    },
  },
  backendUrl: 'http://localhost:5000', // Replace with your backend URL in production
};
