import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://elabs-karnival-api.el.r.appspot.com/';

const socket = io.connect(URL);

export default socket;
