import { navbar, dropdown } from './HtmlComponents.js';

import { goTo } from './viewController.js';

const navBarClient = (element, display) => {
  const menuNavBar = document.querySelector('header');

  menuNavBar.innerHTML = navbar(dropdown);

  element.innerHTML = display;

  const dropMenu = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropMenu, { coverTrigger: false });

  const mobileMenu = document.getElementById('mobile-nav');
  M.Sidenav.init(mobileMenu);

  const modal = document.querySelectorAll('.modal');
  M.Modal.init(modal);

  document.querySelector('#return-menu').addEventListener('click', () => goTo('mapQhawax'));
  document.querySelector('#return-menu-mobile').addEventListener('click', () => goTo('mapQhawax'));
  document.querySelector('#home-menu').addEventListener('click', () => goTo(''));
  document.querySelector('#home-menu-mobile').addEventListener('click', () => goTo(''));
  document.querySelector('#download-menu').addEventListener('click', () => goTo('download'));
  document.querySelector('#download-mob-menu').addEventListener('click', () => goTo('download'));
  document.querySelector('#dashboard-menu').addEventListener('click', () => goTo('dashboard'));
  document.querySelector('#dashboard-menu-mob').addEventListener('click', () => goTo('dashboard'));
  document.querySelector('#graphics-menu').addEventListener('click', () => goTo('graphics'));
  document.querySelector('#graphics-menu-mob').addEventListener('click', () => goTo('graphics'));
};

export { navBarClient };
