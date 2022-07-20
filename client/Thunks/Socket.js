/** @format */

import io from '../../socket.io-client/dist/socket.io';

const socketEndpoint = 'https://geoispy.herokuapp.com/';

let socket;

export const createSocket = () => {
  socket = io(socketEndpoint, {
    transports: ['websocket'],
  });
  // console.log(socket.engine.clientsCount);
  if (io.engine) {
    console.log(io.engine.clientsCount);
  }

  return;
};
createSocket();
export const removeSocket = () => {
  console.log('REMOVED');
  socket.disconnect();
  socket.removeAllListeners();
  socket = null;
  return;
};

export default socket;
