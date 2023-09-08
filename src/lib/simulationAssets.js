import { requestQhawaxFlight, requestTelemetryFlight, requestQhawaxTrip } from '../requests/get.js';
import { newMarkerDrone, newPolyline, addLine, removeLine, newCircle, circlesArray, indexedData} from '../lib/droneAssets.js';
import { toast, newDateLocal } from './helpers.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { infoWindowM} from './infowindow.js';
import { intervalToDuration } from 'date-fns';
import L from 'leaflet';

let flagMarker = false
let flagToast = false
let polylinesArray = [];


export const CallOnceToast = (flag0, value) => {
  if (!flag0) {
    flagToast=!flag0;
    toast(`The value ${value} is out of range`,'grey darken-1 rounded')
  }
  return flag0;
}

export const callOnceMarker = (flag0, flight, map) => {
  if (!flag0) {
      flagMarker = !flag0;
      const marker = newMarkerDrone(flight, map);
      const bounds = L.latLngBounds();
      map.markers.forEach(m => bounds.extend(m.getLatLng()));
      map.fitBounds(bounds);
  }
  return flag0;
}

export const indexed = (data, flight)=>data.reduce((acc,el,i)=>({
  ...acc,
  [i]:{'center':{'lat':el.lat,'lng':el.lon},[flight.sensor]:el[flight.sensor],'sensor':flight.sensor}
 }),[])

export const drawSensorValues = async (flight,map) => {
  const data = await requestQhawaxFlight(flight.name, flight.start, flight.end); 
  if(data.length>0){
    const center = indexed(data, flight)
    Object.values(center).forEach(c=>c[flight.sensor]<0||c[flight.sensor]===null||c[flight.sensor]===undefined?CallOnceToast(flagToast,c[flight.sensor]):newCircle(c,map))
  }
   else{
    toast(`There are no measurements for ${flight.name} on sensor ${flight.sensor}`,'grey darken-1 rounded')
   }
}

export const stopFlight = (flight, map, element) => {
  const selection= element.querySelector('.over_map_droneselection');
  const selectionSensor= element.querySelector('#selectSensor');
  const drawBtn = element.querySelector('#draw-btn');

  toast(`The flight of the Andean drone ${flight.name} has ended now`,'white-text blue darken-1 rounded')
  setTimeout(()=>map.infowindows[0].close(),2000)
  selection.classList.remove('none')
  flight.sensor=selectionSensor.value
  selectionSensor.addEventListener('change',e=>{
    flight.sensor=e.target.value;
  })

  drawBtn.addEventListener('click',e=>{
    flagToast = false;
    drawSensorValues(flight,map)
    circlesArray.forEach(c=>removeLine(c)) 
  })
  return true;
  // setTimeout(polylinesArray.forEach(p=>{removeLine(p);infowindow.close()}) , 10000)
};

export const drawTelemetry = async (flight, map, element) => {
  const flightPlanCoordinates = [];
  const telemetry = await requestTelemetryFlight(flight.name, flight.start, flight.end);
  const numberOfWaypoints = telemetry.length - 1;
  telemetry.forEach((t, i) => {
      setTimeout(() => {
          flight.position = JSON.stringify({ 'lat': parseFloat(t.lat), 'lng': parseFloat(t.lon) });
          callOnceMarker(flagMarker, flight, map);
          const timer = intervalToDuration({ start: new Date(newDateLocal(flight.start)), end: new Date(newDateLocal(flight.end)) });
          flightPlanCoordinates.push(L.latLng(t.lat, t.lon));
          const polyline = newPolyline(flightPlanCoordinates);
          addLine(polyline, map);
          polylinesArray.push(polyline);
          if (numberOfWaypoints === i) return stopFlight(flight, map, element);
      }, i * 1000);
  });
};

const csvFields = [
  'CO (ppm)',
  'CO2 (ppm)',
  'CO (ug/m3)',
  'H2S (ppm)',
  'H2S (ug/m3)',
  'Internal Temperature (C)',
  'NO (ppm)',
  'NO2 (ppm)',
  'NO2 (ug/m3)',
  'O3 (ppm)',
  'O3 (ug/m3)',
  'PM1 (ug/m3)',
  'PM10 (ug/m3)',
  'PM2.5 (ug/m3)',
  'SO2 (ppm)',
  'SO2 (ug/m3)',
  'UV',
  'UVA',
  'UVB',
  'VOC',
  'alt (m)',
  'Humidity (%)',
  'Latitude',
  'Longitude',
  'Pressure (Pa)',
  'Noise (dB)',
  'Temperature (C)',
  'Date',
];


export const downloadDrone = async(flight) => {
  let filename =  `${flight.name+ '-'+ flight.comercial_name}`
  const data = await requestQhawaxFlight(flight.name, flight.start, flight.end); 
  if(data.length>0){
    const csvContent = json2csv(data, csvFields);
    download(csvContent, filename)
  }
   else{
    toast(`There are no measurements for ${flight.name} on sensor ${flight.sensor}`,'grey darken-1 rounded')
   }
}

export const downloadMobile = async(flight) => {
  let filename =  `${flight.name+ '-'+ flight.comercial_name}`
  const data = await requestQhawaxTrip(flight.name, flight.start, flight.end); 
  if(data.length>0){
    const csvContent = json2csv(data, csvFields);
    download(csvContent, filename)
  }
   else{
    toast(`No hay medidas para ${flight.name} en el sensor ${flight.sensor}`,'grey darken-1 rounded')
   }
}
export const simulateTrip = (flight, map, element) => {
  const downloadBtn = element.querySelector('#dwn-btn');
  const restartBtn = element.querySelector('#restart-btn');

  restartBtn.addEventListener('click', e => location.reload())
  downloadBtn.addEventListener('click', e => downloadDrone(flight))
  setTimeout(() => {
      toast(`El viaje del qHAWAX Móvil ${flight.name} ha empezado.`, 'orange darken-1 rounded')
  }, 2000)
}


export const simulateFlight = (flight, map, element) => {
  const downloadBtn = element.querySelector('#dwn-btn');
  const restartBtn = element.querySelector('#restart-btn');

  restartBtn.addEventListener('click', e => location.reload())
  downloadBtn.addEventListener('click', e => downloadDrone(flight))
  setTimeout(() => {
      toast(`The flight of the Andean drone ${flight.name} has start`, 'orange darken-1 rounded')
      drawTelemetry(flight, map, element);
  }, 2000)
}