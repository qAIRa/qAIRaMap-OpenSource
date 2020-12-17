import { changeView } from './lib/viewController.js';

const APISource = 'https://qairamapnapi-dev-opensource.qairadrones.com/api/';
const SocketSource = 'https://qairamapnapi-dev-opensource.qairadrones.com/';

window.onload = () => {
  document.getElementById('loader').classList.add('hide');
  window.onhashchange = changeView(window.location.hash);
};

export { APISource, SocketSource };
