import { changeView } from './lib/viewController.js';
// @ts-check
/**
 * @file index.js is the root file for this web page
 * @author Grupo Qaira S.A.C.
 * @see <a href="https://qairamap.qairadrones.com/"> qAIRaMap </a>
 */

/**
 * Service Worker Initialization
 */
const APISource = 'https://qairamapnapi-dev-opensource.qairadrones.com/api/';
const SocketSource = 'https://qairamapnapi-dev-opensource.qairadrones.com/';

window.onload = () => {
  document.getElementById('loader').classList.add('hide');

  const chipAlert = document.querySelectorAll('.chip');
  M.Chips.getInstance(chipAlert);

  window.onhashchange = changeView(window.location.hash);
};

export { APISource, SocketSource };
