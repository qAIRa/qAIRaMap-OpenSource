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

const changeView = (router) => {
  const container = document.getElementById('content-page');
  container.innerHTML = '';
  switch (router) {
  case '#/mapQhawax':
    return container.appendChild(viewFreeMap());
  case '#/mapDrone':
    return container.appendChild(viewFreeDrone());
  case '#/mapMobileQ':
    return container.appendChild(viewFreeMobile());
  case '#/download':
    return container.appendChild(downloadView());
  case '#/downloadDrone':
    return container.appendChild(downloadView());
  case '#/dashboard':
    return container.appendChild(viewDashboard());
  case '#/graphics':
    return container.appendChild(viewGraphics());
  case '#/flightsDrone':
    return container.appendChild(flightsView());
  case '#/simulationDrone':
    return container.appendChild(simulationView(flight));
  case '#/tripMobileQ':
    return container.appendChild(tripMobileView());
  case '#/simulationMobileQ':
    return container.appendChild(simulationMobileView(trip));
  default:
    return container.appendChild(landPage());
  }
};

const goTo = (location) => {
  window.location.assign(`..#/${location}`);
  window.location.reload();
};

export { changeView, goTo };
