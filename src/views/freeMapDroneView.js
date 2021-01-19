import { showActiveDrones} from '../lib/droneAssets.js';
import { droneChartRow } from '../lib/HtmlComponents.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap, droneChart } from '../lib/HtmlComponents.js';
import { requestAllDrones } from '../requests/get.js';
import { SocketSource } from '../index.js';

const addLine = (flightPath,map) => {
  flightPath.setMap(map);
}

const removeLine = (flightPath,map) => {
  flightPath.setMap(null);
}

let latlng = {}


const callSocket = (drone, map, element, marker) => {
  const flightPlanCoordinates = [];
	const socket = io.connect(`${SocketSource}`);
		socket.on(`${drone.name}_processed`, data => {
      console.log(data);
      latlng = {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon),
      };
       flightPlanCoordinates.push(new google.maps.LatLng(data.lat, data.lon))
       console.log('flightPlanCoordinates',flightPlanCoordinates);
       const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
        });
        marker.setPosition(latlng);
        addLine(flightPath,map)

    const status = element.querySelector(`#${data.ID}_status`)
    const position = element.querySelector(`#${data.ID}_position`)

    status.innerText = 'ON';
    position.innerText = `lat:${latlng.lat},lng:${latlng.lng}`;
    })
}

const request = async (map, element) => {
  const qhawax_list = await requestAllDrones();
  const tableRows = element.querySelector('tbody')
  qhawax_list.forEach((a_drone) => {
    
    latlng = {
      lat: parseFloat(a_drone.lat),
      lng: parseFloat(a_drone.lon),
    };
  tableRows.innerHTML += droneChartRow(a_drone,latlng,'OFF')
  const marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Aerial_Photography_UAV_Icon.svg',
        scaledSize: new google.maps.Size(35, 35),
        },
              id: a_drone.name,
          });
  callSocket(a_drone,map, element, marker)
  });
};

const viewFreeDrone = () => {
  const mapElem = document.createElement('div');

  navBarClient(mapElem, viewMap);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',droneChart)

  const droneTable = mapElem.querySelector('#over_map_drones');

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: { lat: -12.1215361, lng: -77.0463574},
    zoom: 8,
  });
  map.markers = [];
  request(map, mapElem)

  return mapElem;
};

export { viewFreeDrone };
