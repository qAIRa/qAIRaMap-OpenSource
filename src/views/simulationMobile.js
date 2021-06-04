import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewMobileQ } from '../html/freeMapMobileQ.js';
import {simulationSelectionMobile, simulationBtnsMobile} from '../html/simulation.js';
import { firstMap} from '../lib/mapAssets.js';
import { simulateTrip} from '../lib/simulationMobileAssets.js';


export const simulationMobileView = (flight) => {
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewMobileQ);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',simulationBtnsMobile)
  wrapper.insertAdjacentHTML('afterbegin',simulationSelectionMobile)

  const map = firstMap(mapElem,'map')
  simulateTrip(flight,map, mapElem)

  return mapElem;
  };
  