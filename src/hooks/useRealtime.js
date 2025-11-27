import { useEffect, useState } from 'react';
import { socket } from 'src/services/realtime';

export const useRealtime = (event, callback) => {
  useEffect(() => {
    socket.connect();
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
      socket.disconnect();
    };
  }, [event, callback]);
};
