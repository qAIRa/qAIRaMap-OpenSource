import { drawQhawaxMap } from '../lib/mapAssets.js';
import { showActiveDrones} from '../lib/droneAssets.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap, droneChart } from '../lib/HtmlComponents.js';
import { requestAllQhawax } from '../requests/get.js';

const request = async (element, map) => {
  const drone_list = await requestAllQhawax();
  if(drone_list===[]){
    M.toast({
			html: `There are no Andean Drones currently conected.`,
			classes: 'grey darken-1 rounded',
			displayLength: 6000,
		});
  } else {
    drone_list.forEach((drone) => {
      showActiveDrones(element, drone, map);
    });
  }
  
};

const viewFreeDrone = () => {
  const mapElem = document.createElement('div');

  navBarClient(mapElem, viewMap);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',droneChart)

  const droneTable = mapElem.querySelector('#over_map_drones');

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    center: {
      lat: -12.04318,
      lng: -77.02824,
    },
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  map.markers = [];
  map.latitude = [];
  map.longitude = [];
  request(droneTable, map);

  return mapElem;
};

export { viewFreeDrone };
