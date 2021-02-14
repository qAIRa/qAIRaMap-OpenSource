import { infoWindowT} from './infowindow.js';
import { lastStartFlight, getInFlightSensor, noParametersRequest } from '../requests/get.js';
import { toast } from '../lib/helpers.js';
import { intervalToDuration } from 'date-fns';
import {socket} from '../index.js'
;

const addLine = (polyline,map) => {
  polyline.setMap(map);
}

const removeLine = (polyline) => {
  polyline.setMap(null);  
}

let latlngLine = {};
let latlngMarker = {};

const createOption = async (selection)=>{
  selection.innerHTML='<option value="" disabled selected>Andean Drone</option>'
  await noParametersRequest('flight_log_info_during_flight')
  .then(e=>e.forEach(drone=>{
    const option = document.createElement('option');
    option.setAttribute('value', drone.name);
    option.innerText =	drone.name+' :'+drone.comercial_name ;
    selection.appendChild(option);
  }))
  .catch(e=>null)
}

const circlesArray = [];
const newCircle = (center,map)=> {
  const pollutantCircle = new google.maps.Circle({
    strokeColor: "#00ff51",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#00ff51",
    fillOpacity: 0.35,
    map,
    center: center.center,
    radius: 10,
  });
circlesArray.push(pollutantCircle)
console.log(circlesArray);
}

const callSocketSensors = (params, map) =>  {
  console.log('params',params);
  socket.on(`${params.name}_${params.sensor}_processed`, data => {
    newCircle(data,map)
  })
  
}

const drawCirclesPollutant = async(params,map)=> {
 const data = await getInFlightSensor(params)

 const center = data.reduce((acc,el,i)=>({
  ...acc,
  [i]:{'center':{'lat':el.lat,'lng':el.lon},[params.sensor]:el.pollutant,'sensor':params.sensor}
 }),[])
 Object.values(center).forEach(c=>newCircle(c,map))
callSocketSensors(params, map)

}

const activateDrawBtn = (drawBtn, params)=>{
  typeof params.name !== "string" || typeof params.sensor!== "string"?
  drawBtn.classList.add('disabled'):drawBtn.classList.remove('disabled')
}

const selectDroneFlight = async(element, map) =>{
  let params = {}
  const selectionName= element.querySelector('#selectDrone');
  const selectionSensor= element.querySelector('#selectSensor');
  const drawBtn = element.querySelector('#draw-btn');
  createOption (selectionName)
  
  selectionName.addEventListener('change',e=>{
    params.name=e.target.value;
    activateDrawBtn(drawBtn, params)
  })

  selectionSensor.addEventListener('change',e=>{
    params.sensor=e.target.value;
    activateDrawBtn(drawBtn, params)
  })

  drawBtn.addEventListener('click',e=>{
    drawCirclesPollutant(params,map)
    circlesArray.forEach(c=>removeLine(c)) 
  })

}



const landing = (drone, polylinesArray, infowindow, selection)=>{

  socket.on(`${drone.name}_landing`, data => {
    toast(`${drone.name}: The Andean Drone ${drone.comercial_name} has landed now.`,'white-text blue darken-1 rounded');
    setTimeout(polylinesArray.forEach(p=>{removeLine(p);infowindow.close()}) , 10000)
    circlesArray.forEach(c=>removeLine(c))
    createOption(selection)
  })
  
};





const callSocketFlight = (drone, map, selection) => {
  const flightPlanCoordinates = [];
  let polylinesArray = [];

  const marker=map.markers.find(el=>el.id===drone.name+'_marker')
  const infowindow = map.infowindows.find(el=>el.id===drone.name+'_infowindow')
  
		socket.on(`${drone.name}_telemetry`, async data => {
      const start = await lastStartFlight(drone.name)
      const timer=intervalToDuration({start:new Date(typeof start==='string'?new Date():start.start_flight),end:new Date()})
      latlngLine = {
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

        marker.setPosition(latlngLine)
        addLine(polyline,map)
        infowindow.setContent(infoWindowT(data,drone,timer))
        infowindow.open(map, marker);
        polylinesArray.push(polyline)

    })

   landing(drone, polylinesArray, infowindow, selection)
}

const takeoff = (drone, selection)=>{

  socket.on(`${drone.name}_takeoff`, data => {
    toast(`${drone.name}: The Andean Drone ${drone.comercial_name} has taken off now.`,'orange darken-1 rounded');
    createOption(selection)
  })

};

const requestDrones = async (map, element) => {
  const drone_list = await noParametersRequest('AllDronesInMap/');
  if (drone_list.length>=1){
    drone_list.forEach((a_drone) => {
      latlngMarker = {
        lat: parseFloat(a_drone.lat),
        lng: parseFloat(a_drone.lon),
      };
    const marker = new google.maps.Marker({
          position: latlngMarker,
          map: map,
          icon: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Aerial_Photography_UAV_Icon.svg',
          scaledSize: new google.maps.Size(45, 45),
          },
          id: a_drone.name + '_marker',
    });

    const infowindow = new google.maps.InfoWindow({id:a_drone.name+'_infowindow'});
    map.infowindows.push(infowindow)
    map.markers.push(marker)
   
    const bounds = new google.maps.LatLngBounds();
    map.markers.forEach(m=> bounds.extend(m.getPosition()))
    map.fitBounds(bounds);
    //  const zoom = map.getZoom();
    //  map.setZoom(zoom > 8 ? 8 : zoom);
    takeoff(a_drone, element.querySelector('#selectDrone'))
    callSocketFlight(a_drone,map, element.querySelector('#selectDrone'))
    
    });
    selectDroneFlight(element,map)
    

  }else {
    toast(`There are no Andean Drones available at the moment.`,'grey darken-1 rounded')
  }
 
};


export { requestDrones };
