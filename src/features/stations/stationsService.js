import api from 'src/services/api';

export const getStations = async () => {
  // In a real app, you'd fetch this from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Station 1', location: 'Location 1' },
        { id: 2, name: 'Station 2', location: 'Location 2' },
      ]);
    }, 1000);
  });
};

export const getStationById = async (id) => {
  // In a real app, you'd fetch this from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `Station ${id}`, location: `Location ${id}` });
    }, 1000);
  });
};
