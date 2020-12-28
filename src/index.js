import { changeView } from './lib/viewController.js';

const APISource = 'https://openqairamapnap.qairadrones.com/api/';
const SocketSource = 'https://openqairamapnap.qairadrones.com/';

window.onload = () => {
  document.getElementById('loader').classList.add('hide');
  window.onhashchange = changeView(window.location.hash);
};

export { APISource, SocketSource };
