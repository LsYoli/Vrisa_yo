import api from 'src/services/api';

export const getAlerts = async () => {
  // In a real app, you'd fetch this from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, message: 'Alert 1', timestamp: new Date().toISOString() },
        { id: 2, message: 'Alert 2', timestamp: new Date().toISOString() },
      ]);
    }, 1000);
  });
};
