import api from 'src/services/api';

export const login = async (credentials) => {
  // In a real app, you'd make a POST request to your API
  // For this prototype, we'll just simulate a login
  console.log('Logging in with:', credentials);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: 'Test User' }, token: 'fake-jwt-token' });
    }, 1000);
  });
};

export const logout = async () => {
  // In a real app, you might invalidate the token on the server
  console.log('Logging out');
  return Promise.resolve();
};
