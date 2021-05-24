import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewMobileQ } from '../html/freeMapMobileQ.js';
import {simulationSelection, simulationBtns} from '../html/simulation.js';
import { firstMap} from '../lib/mapAssets.js';
import { simulateFlight} from '../lib/simulationAssets.js';


export const simulationMobileView = (flight) => {
    console.log(flight);
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewMobileQ);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',simulationBtns)
  wrapper.insertAdjacentHTML('afterbegin',simulationSelection)

  const map = firstMap(mapElem,'map')
  simulateFlight(flight,map, mapElem)


  
  return mapElem;
  };
  