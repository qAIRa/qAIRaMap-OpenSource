import { changeView } from './lib/viewController.js';

const APISource = 'https://openqairamapnapi.qairadrones.com/api/';
const SocketSource = 'https://openqairamapnapi.qairadrones.com/';
// const APISource = 'http://0.0.0.0:5000/api/'
// const SocketSource ='http://0.0.0.0:5000/'
window.onload = () => {
  document.getElementById('loader').classList.add('hide');
  window.onhashchange = changeView(window.location.hash);
};

export { APISource, SocketSource };
