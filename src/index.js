import { loadView } from './lib/viewController.js';

const APISource = 'https://openqairamapnapi.qairadrones.com/api/';
const SocketSource = 'https://openqairamapnapi.qairadrones.com/';
// const APISource = 'http://0.0.0.0:5000/api/'
// const SocketSource ='http://0.0.0.0:5000/'
// const socket = io.connect(`${SocketSource}`);

window.onload = () => {
  document.getElementById('loader').classList.add('hide');
  document.cookie = 'SameSite=None; Secure';
  loadView('/');
};

window.addEventListener('popstate', event => loadView(event.state.route));

export {
  APISource,
  SocketSource,
  //  socket
};
