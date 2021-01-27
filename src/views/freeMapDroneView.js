
import { droneChartRow } from '../lib/HtmlComponents.js';
import { infoWindow} from '../lib/infowindow.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap, droneChart } from '../lib/HtmlComponents.js';
import { requestAllDrones } from '../requests/get.js';
import { SocketSource } from '../index.js';

const addLine = (polyline,map) => {
  polyline.setMap(map);
}

const removeLine = (polyline, name, socket) => {
  polyline.setMap(null);
  socket.removeListener(`${name}_telemetry`);
}

let latlng = {};

const callSocketFlight = (drone, map, element, marker, socket, infowindow, start) => {
  const flightPlanCoordinates = [];
  let polylinesArray = [];
  const status = element.querySelector(`#${drone.name}_status`);
  const position = element.querySelector(`#${drone.name}_position`);

		socket.on(`${drone.name}_telemetry`, data => {
      data.start = new Date(new Date().getTime()-new Date(start).getTime())
      console.log(data);
      latlng = {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon),
      };
       flightPlanCoordinates.push(new google.maps.LatLng(data.lat, data.lon))
       const polyline = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
        });
        marker.setPosition(latlng);
        addLine(polyline,map)
        infowindow.setContent(infoWindow(data))
        infowindow.open(map, marker);
        polylinesArray.push(polyline)
    

    status.innerText = 'ON';
    position.innerText = `lat:${latlng.lat.toFixed(5)},lng:${latlng.lng.toFixed(5)}`;
    })

   socket.on(`${drone.name}_landing`, data => {
    console.log(data);
    M.toast({
    html: `${drone.name}: The Andean Drone ${drone.comercial_name} has landed now.`,
		classes: 'white-text blue darken-1 rounded',
    displayLength: 6000
    })
    setTimeout(polylinesArray.forEach(p=>removeLine(p, drone.name, socket)) , 10000)
    status.innerText = 'OFF';
  })
}

const takeoff = (drone,map, element, marker, socket, infowindow)=>{

  socket.on(`${drone.name}_takeoff`, data => {
    M.toast({
    html: `${drone.name}: The Andean Drone ${drone.comercial_name} has taken off now.`,
		classes: 'orange darken-1 rounded',
    displayLength: 6000
    })
    console.log(data);
    callSocketFlight(drone,map, element, marker, socket, infowindow,data)
  })

};

const request = async (map, element) => {
  const socket = io.connect(`${SocketSource}`);
  const qhawax_list = await requestAllDrones();
  const tableRows = element.querySelector('tbody');
  const pannelDrones = element.querySelector('#over_map_drones');
  if (qhawax_list.length>=1){
    pannelDrones.classList.remove('none')
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
    map.markers.push(marker)
     


     const infowindow = new google.maps.InfoWindow({
      // maxWidth: 200,
    });

    takeoff(a_drone,map,element, marker, socket, infowindow)
    
    const bounds = new google.maps.LatLngBounds();
     for (let i = 0; i < map.markers.length; i++) {
       bounds.extend(map.markers[i].getPosition());
     }
     map.fitBounds(bounds);
     const zoom = map.getZoom();
     map.setZoom(zoom > 8 ? 8 : zoom);
    });

  }else {
    pannelDrones.classList.add('none')
    M.toast({
      html: `There are no Andean Drones available at the moment.`,
      classes: 'grey darken-1 rounded',
      displayLength: 6000
      })
  }

 
 
};

const viewFreeDrone = () => {
  const mapElem = document.createElement('div');

  navBarClient(mapElem, viewMap);

  const wrapper = mapElem.querySelector('#wrapper_map')
  wrapper.insertAdjacentHTML('afterbegin',droneChart)

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: { lat: -12.1215361, lng: -77.0463574},
    zoom: 8,
  });
  map.markers=[];
  request(map, mapElem)
  
  return mapElem;
};

export { viewFreeDrone };
