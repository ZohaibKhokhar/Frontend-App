export const environment = {
  production: true,
//  baseUrl: 'http://web/api/', // 👈 docker-compose service name for backend
baseUrl:'http://localhost:5000/api',
  tokenKey: 'jwtToken',
  roleKey: 'userRole'
};
