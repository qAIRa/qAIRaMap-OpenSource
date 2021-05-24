import { navbar, navbarDrone, navbarMobileQ } from '../html/navBar.js';

import { goTo } from './viewController.js';

export const navBarQhawax = (element, display) => {
  const menuNavBar = document.querySelector('header');

  menuNavBar.innerHTML = (window.location.hash).slice(-5) === 'Drone' ? navbarDrone : (window.location.hash).slice(-7) === 'MobileQ'? navbarMobileQ: navbar;
  element.innerHTML = display;

  const dropMenu = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropMenu, { coverTrigger: false });

  const mobileMenu = document.getElementById('mobile-nav');
  M.Sidenav.init(mobileMenu);

  const modal = document.querySelectorAll('.modal');
  M.Modal.init(modal);

  document.querySelectorAll('.menu-btn').forEach((btn) => {
    switch (btn.id) {
    case 'home-menu': case 'home-menu-mobile': btn.addEventListener('click', () => goTo('')); break;
    case 'return-menu': case 'return-menu-mobile': btn.addEventListener('click', () => goTo('mapQhawax')); break;
    case 'return-menu-drone': case 'return-menu-mobile-drone': btn.addEventListener('click', () => goTo('mapDrone')); break;
    case 'download-menu': case 'download-mob-menu': btn.addEventListener('click', () => goTo('download')); break;
    // case 'download-menu-drone': case 'download-mob-menu-drone': btn.addEventListener('click', () => goTo('downloadDrone')); break;
    case 'dashboard-menu': case 'dashboard-menu-mob': btn.addEventListener('click', () => goTo('dashboard')); break;
    case 'graphics-menu': case 'graphics-menu-mob': btn.addEventListener('click', () => goTo('graphics')); break;
    // case 'graphics-menu-drone': case 'graphics-menu-mob-drone': btn.addEventListener('click', () => goTo('graphicsDrone')); break;
    case 'flight-menu': case 'flight-menu-mob': btn.addEventListener('click', () => goTo('flightsDrone')); break;
    case 'trip-menu': case 'trip-menu-mob': btn.addEventListener('click', () => goTo('tripMobileQ')); break;
    case 'return-menu-mobileQ': case 'return-menu-mob-mobileQ': btn.addEventListener('click', () => goTo('mapMobileQ')); break;
    default:
      break;
    }
  });
};

