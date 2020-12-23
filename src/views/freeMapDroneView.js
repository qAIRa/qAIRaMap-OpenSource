import { drawQhawaxMap } from '../lib/mapAssets.js';
import { showActiveDrones} from '../lib/droneAssets.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap, droneChart } from '../lib/HtmlComponents.js';
import { requestAllQhawax } from '../requests/get.js';

// const request = async (element, map) => {
//   const drone_list = await requestAllQhawax();
//   if(drone_list===[]){
//     M.toast({
// 			html: `There are no Andean Drones currently conected.`,
// 			classes: 'grey darken-1 rounded',
// 			displayLength: 6000,
// 		});
//   } else {
//     drone_list.forEach((drone) => {
//       console.log(drone);
//       // showActiveDrones(element, drone, map);
//     });
//   }
  
// };

const viewFreeDrone = () => {
  const mapElem = document.createElement('div');

  navBarClient(mapElem, viewMap);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',droneChart)

  const droneTable = mapElem.querySelector('#over_map_drones');

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  map.markers = [];

  // request(droneTable, map);
  const flightPlanCoordinates = [];
  fetch('/data.json').then((response) => {
 
    response.json().then((data) => {
        // console.log(data);
        if(data===[]){
          M.toast({
            html: `There are no Andean Drones currently conected.`,
            classes: 'grey darken-1 rounded',
            displayLength: 6000,
          });
        } else {
        
            showActiveDrones(mapElem, data.slice(-1).pop(), map);
        
        }
        
          
            data.forEach(drone=>{
          flightPlanCoordinates.push(new google.maps.LatLng(drone.lat, drone.lon)) 
            })
        
            const flightPath = new google.maps.Polyline({
              path: flightPlanCoordinates,
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2
              });
              flightPath.setMap(map);
            })
        
   
});




  return mapElem;
};

export { viewFreeDrone };
