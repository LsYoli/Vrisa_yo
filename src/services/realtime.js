import { io } from 'socket.io-client';

// Replace with your server URL
const URL = 'http://localhost:4000';
export const socket = io(URL, {
  autoConnect: false,
});
