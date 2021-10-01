import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewDrones, droneSelection } from '../html/freeMapDrone.js';
import { firstMap } from '../lib/mapAssets.js';
import { requestDrones } from '../lib/droneAssets.js';

const viewFreeDrone = () => {
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewDrones);

  const wrapper = mapElem.querySelector('#wrapper_map');
  wrapper.insertAdjacentHTML('afterbegin', droneSelection);

  const map = firstMap(mapElem, 'map');
  requestDrones(map, mapElem);

  return mapElem;
};

export { viewFreeDrone };
