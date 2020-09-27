import { landbar, landpage } from '../lib/HtmlComponents.js';
import { goTo } from '../lib/viewController.js';

const landPage = () => {
  const landElem = document.createElement('div');
  const menuNavBar = document.querySelector('header');

  menuNavBar.innerHTML = landbar;

  landElem.innerHTML = landpage;
  const background = landElem.querySelector('#background');
  background.classList.add('valign-wrapper');
  background.style.height = '88vh';
  background.style.backgroundImage = 'url(img/droneAndino.jpg)';
  background.style.backgroundRepeat = 'no-repeat';
  background.style.backgroundPosition = 'center';
  background.style.position = 'relative';
  const foreground = landElem.querySelector('#foreground');
  foreground.style.width = '100%';
  landElem.querySelector('#qhawax_map').style.marginLeft = '25%';
  landElem.querySelector('#andean_map').style.marginRight = '25%';
  landElem.querySelector('#qhawax_map').addEventListener('click', () => {
    goTo('mapQhawax');
  });
  landElem.querySelector('#andean_map').addEventListener('click', () => {
    goTo('mapDrone');
  });

  return landElem;
};

export { landPage };
