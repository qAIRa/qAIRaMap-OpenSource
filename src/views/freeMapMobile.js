import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewMobileQ, mobileSelection } from '../html/freeMapMobileQ.js';
import { firstMap } from '../lib/mapAssets.js';
import { requestMobileQ } from '../lib/mobileAssets.js';

const viewFreeMobile = () => {
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewMobileQ);

  const wrapper = mapElem.querySelector('#wrapper_map');
  wrapper.insertAdjacentHTML('afterbegin', mobileSelection);

  const map = firstMap(mapElem, 'map');

  requestMobileQ(map, mapElem);

  return mapElem;
};

export { viewFreeMobile };
