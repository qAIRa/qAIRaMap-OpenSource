import { landbar, landpage } from '../html/landpage.js';
import { goTo } from '../lib/viewController.js';

const landPage = () => {
  const landElem = document.createElement('div');
  const menuNavBar = document.querySelector('header');
  menuNavBar.innerHTML = landbar;
  landElem.innerHTML = landpage;
  landElem.querySelector('#qhawax_map').addEventListener('click', () => goTo('mapQhawax'));
  landElem.querySelector('#andean_map').addEventListener('click', () => goTo('mapDrone'));
  landElem.querySelector('#qhawax_mobile_map').addEventListener('click', () => goTo('mapMobileQ'));
  return landElem;
};

export { landPage };
