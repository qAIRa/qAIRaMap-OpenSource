import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';
import { viewDashboard } from '../views/dashboardView.js';
import { viewGraphics } from '../views/graphicsView.js';
import { landPage } from '../views/landpageView.js';
import { viewFreeDrone } from '../views/freeMapDroneView.js';

const changeView = (router) => {
  const container = document.getElementById('content-page');
  container.innerHTML = '';
  switch (router) {
  case '#/mapQhawax':
    return container.appendChild(viewFreeMap());
  case '#/mapDrone':
    return container.appendChild(viewFreeDrone());
  case '#/download':
    return container.appendChild(downloadView());
  case '#/downloadDrone':
    return container.appendChild(downloadView());
  case '#/dashboard':
    return container.appendChild(viewDashboard());
  case '#/graphics':
    return container.appendChild(viewGraphics());
  default:
    return container.appendChild(landPage());
  }
};

const goTo = (location) => {
  window.location.assign(`..#/${location}`);
  window.location.reload();
};

export { changeView, goTo };
