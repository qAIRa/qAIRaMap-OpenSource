import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewDrones } from '../html/freeMapDrone.js';
import { simulationSelection, simulationBtns } from '../html/simulation.js';
import { firstMap } from '../lib/mapAssets.js';
import { simulateTrip } from '../lib/simulationAssets.js';

const simulationView = (trip) => {
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewDrones);

  const wrapper = mapElem.querySelector('#wrapper_map');
  wrapper.insertAdjacentHTML('afterbegin', simulationBtns);
  wrapper.insertAdjacentHTML('afterbegin', simulationSelection);

  const map = firstMap(mapElem, 'map');
  simulateTrip(trip, map, mapElem);

  return mapElem;
};

export { simulationView };
