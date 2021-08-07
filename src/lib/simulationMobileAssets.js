import { requestQhawaxTrip } from '../requests/get.js';
import { toast, newDateLocal } from './helpers.js';
import { newMarkerMobile} from '../lib/mobileAssets.js';
import { intervalToDuration } from 'date-fns';
import { addLine, removeLine, newPolyline, circleColor} from './droneAssets.js';
import { infoWindowM} from './infowindow.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { goTo } from './viewController.js';

let flagToast = false
let flagMarker = false
let polylinesArray = [];
let circlesArray = [];
const csvFields = [
    'CO (ug/m3)',
    'H2S (ug/m3)',
    'NO2 (ug/m3)',
    'O3 (ug/m3)',
    'PM10 (ug/m3)',
    'PM2.5 (ug/m3)',
    'SO2 (ug/m3)',
    'Latitud',
    'Longitud',
    'Fecha',
  ];

  export const update =(value)=>{
    let prevData = JSON.parse(sessionStorage.getItem('trip'));
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    })
    sessionStorage.setItem('trip', JSON.stringify(prevData));
  }

  const newCircle = (center,map)=> {
    const pollutantCircle = new google.maps.Circle({
      strokeColor: circleColor(center),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: circleColor(center),
      fillOpacity: 0.35,
      map,
      center: center.center,
      radius: 20,
    });
  circlesArray.push(pollutantCircle)
  }

  const CallOnceToast = (flag0, value) => {
    if (!flag0) {
      flagToast=!flag0;
      toast(`Valor: ${value} fuera de rango`,'grey darken-1 rounded')
    }
    return flag0;
  }
export const callOnceMarker = (flag0, trip, map) => {
    if (!flag0) {
      flagMarker=!flag0;
      const marker = newMarkerMobile(trip,map)
      // const infowindow = new google.maps.InfoWindow({id:trip.name+'_infowindow'});
      // map.infowindows.push(infowindow)
      map.markers.push(marker)
      const bounds = new google.maps.LatLngBounds();
      map.markers.forEach(m=> bounds.extend(m.getPosition()))
      map.fitBounds(bounds);
    }
    return flag0;
  }
  const indexed = (data, trip)=>data.reduce((acc,el,i)=>({
    ...acc,
    [i]:{'center':{'lat':el.lat,'lng':el.lon},[trip.sensor]:el[trip.sensor],'sensor':trip.sensor}
   }),[])

  export const drawSensorValues = async (trip,map) => {
    const data = await requestQhawaxTrip(trip.name, trip.turn, trip.trip_id); 
    if(data.length>0){
      const center = indexed(data, trip)
      Object.values(center).forEach(c=>c[trip.sensor]<0||c[trip.sensor]===null||c[trip.sensor]===undefined?CallOnceToast(flagToast,c[trip.sensor]):newCircle(c,map))
    }
     else{
      toast(`No hay medidas para ${trip.name} en el sensor ${trip.sensor}`,'grey darken-1 rounded')
     }
  }

export const stopTrip = (trip, map, element) => {
    const selection= element.querySelector('.over_map_droneselection');
    const selectionSensor= element.querySelector('#selectSensor');
    const drawBtn = element.querySelector('#draw-btn');
  
    // toast(`The trip of the mobile qHAWAX ${trip.name} has ended now`,'white-text blue darken-1 rounded')
    // setTimeout(()=>map.infowindows[0].close(),2000)
    selection.classList.remove('none')
    trip.sensor=selectionSensor.value
    update({sensor:selectionSensor.value})
    selectionSensor.addEventListener('change',e=>{
      trip.sensor=e.target.value;
      update({sensor:e.target.value})
    })
  
    drawBtn.addEventListener('click',e=>{
      flagToast = false;
      drawSensorValues(trip,map)
      circlesArray.forEach(c=>removeLine(c)) 
    })
    return true;
    // setTimeout(polylinesArray.forEach(p=>{removeLine(p);infowindow.close()}) , 10000)
  };

export const drawTrip = async(trip, map, element)=> {
  toast(`Estamos cargando los datos del viaje del qHAWAX Móvil: ${trip.name}.`,'orange darken-1 rounded')
    const flightPlanCoordinates = [];
    const start = new Date(newDateLocal(trip.start));
    const end = new Date(newDateLocal(trip.end));
    const data = await requestQhawaxTrip(trip.name, trip.turn, trip.trip_id); 
    const numberOfWaypoints = data.length-1;
    const bounds = new google.maps.LatLngBounds();
    if(data.length>0){
      data.forEach( (t,i)=> 
     {
    
      trip.position = JSON.stringify({'lat':parseFloat(t.lat),'lng':parseFloat(t.lon)})
      callOnceMarker(flagMarker,trip, map)
      // setTimeout(()=>{
      const timer=intervalToDuration({start:start,end:end})
      flightPlanCoordinates.push(new google.maps.LatLng({'lat':t.lat,'lng':t.lon}))
      const polyline = newPolyline(flightPlanCoordinates)
      map.markers[0].setPosition(new google.maps.LatLng({'lat':t.lat,'lng':t.lon}))
      addLine(polyline,map)
      // map.infowindows[0].setContent(infoWindowM(t,trip,timer))
      // map.infowindows[0].open(map, map.markers[0]);
      polylinesArray.push(polyline)
      bounds.extend(new google.maps.LatLng({'lat':t.lat,'lng':t.lon}))
      map.fitBounds(bounds);
      if(numberOfWaypoints===i) return stopTrip(trip,map,element)//CHECK
    // },i*1000)
  })
    }
     else{
      toast(`No hay medidas para ${trip.name} `,'grey darken-1 rounded')
      setTimeout(()=>{goTo('tripMobileQ')},1000)
     }
    
  };

  export const downloadMobile = async(trip) => {
    let filename =  `${trip.name+ '-'+ trip.comercial_name+ '-turno-'+trip.turn+'-dia-'+trip.start.split(' ')[0]}`
    const data = await requestQhawaxTrip(trip.name, trip.turn, trip.trip_id); 
    if(data.length>0){
      const csvContent = json2csv(data, csvFields);
      download(csvContent, filename)
    }
     else{
      toast(`No hay medidas para ${trip.name} en el sensor ${trip.sensor}`,'grey darken-1 rounded')
     }
  }



export const simulateTrip = (trip,map, element)=>{
    const downloadBtn = element.querySelector('#dwn-btn');
    const restartBtn = element.querySelector('#restart-btn');
    const turnSelect = element.querySelector('#selectTurn');
    turnSelect.value=trip.turn
  
    
    drawTrip(trip, map, element);
    turnSelect.addEventListener('change',e=>{
      trip.turn=e.target.value
      update({turn: e.target.value})
      drawTrip(trip, map, element);
    })

    restartBtn.addEventListener('click',e=>location.reload())
    downloadBtn.addEventListener('click',e=>downloadMobile(trip))
      // setTimeout(()=>{
      //     toast(`The trip of the Mobile qHAWAX ${trip.name} has start`,'orange darken-1 rounded')
      //     drawTrip(trip, map, element);
      // },2000)
  }