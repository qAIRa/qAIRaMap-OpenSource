import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';
import { viewDashboard } from '../views/dashboardView.js';
import { viewGraphics } from '../views/graphicsView.js';
import { landPage } from '../views/landpageView.js';
import { viewFreeDrone } from '../views/freeMapDroneView.js';
import { flightsView } from '../views/flightsView.js';
import { simulationView } from '../views/simulationDrone.js';
import { simulationMobileView } from '../views/simulationMobile.js';
import { viewFreeMobile } from '../views/freeMapMobile.js';
import { tripMobileView } from '../views/tripMobileView.js';

const flight = JSON.parse(sessionStorage.getItem('flight'));
const trip = JSON.parse(sessionStorage.getItem('trip'));

const ROUTES = {
  mapQhawax: viewFreeMap,
  mapDrone: viewFreeDrone,
  mapMobileQ: viewFreeMobile,
  download: downloadView,
  downloadDrone :downloadView,
  dashboard: viewDashboard,
  graphics :viewGraphics,
  flightsDrone: flightsView,
  simulationDrone: simulationView,
  tripMobileQ: tripMobileView,
  simulationMobileQ: simulationMobileView,
  '/': landPage,
};

const loadView = (route) => {
  const container = document.getElementById('content-page');
  const view = ROUTES[route] || ROUTES['/'];
  container.innerHTML = '';
  return container.appendChild(view());
}

const goTo = (route) => {
  loadView(route);
  window.history.pushState({ route }, `${route}`, route === '/' ? route : `/${route}`);
};

export { loadView, goTo };
