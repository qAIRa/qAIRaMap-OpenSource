import { noParametersRequest, lastStartTrip, getInTripSensor } from '../requests/get.js';
import {socket} from '../index.js';
import { toast } from '../lib/helpers.js';
import { addLine, removeLine, newPolyline, activateDrawBtn, circleColor} from './droneAssets.js';
import { intervalToDuration } from 'date-fns';
import {infoWindowM} from '../lib/infowindow.js';
import L from 'leaflet';

let circlesArray = [];
let flag = false;

const newCircle = (center, map) => {
  const pollutantCircle = L.circle(center.center, {
    color: circleColor(center),
    weight: 2,
    fillColor: circleColor(center),
    fillOpacity: 0.35,
    radius: 20
  }).addTo(map);
  circlesArray.push(pollutantCircle)
}

const callSocketSensors = (params, map) =>  {
  
  socket.on(`${params.name}_${params.sensor}_valid`, async data => {
    await noParametersRequest('mobile_log_info_during_trip')
      .then(e=>e.forEach(q_mobile=>{
        if (params.sensor===data.sensor && q_mobile.name===params.name) return newCircle(data,map)
        
      }))
      .catch(e=>null)
    
  })
  
}

const drawCirclesPollutant = async(params,map)=> {
  const data = await getInTripSensor(params)
 
  circlesArray.forEach(c=>removeLine(c))
 if(data.length>0){
   const center = data.reduce((acc,el,i)=>({
     ...acc,
     [i]:{'center':{'lat':el.lat,'lng':el.lon},[params.sensor]:el.pollutant,'sensor':params.sensor}
    }),[])
    Object.values(center).forEach(c=>newCircle(c,map))
   callSocketSensors(params, map)
 }
  else{
   toast(`No hay mediciones para ${params.name} en el sensor ${params.sensor}`,'grey darken-1 rounded')
  }
 
 }

 export const newMarkerMobile = (q_mobile, map) => {
  if (!q_mobile.lat || !q_mobile.lon) {
      console.error("Latitud o longitud faltante para q_mobile:", q_mobile.name);
      return null; // Si falta latitud o longitud, no creamos el marcador.
  }

  return L.marker([q_mobile.lat, q_mobile.lon], {
      icon: L.icon({
          iconUrl: 'img/qhawax_movil.png',
          iconSize: [80, 80]
      }),
      id: q_mobile.name + '_marker'
  }).addTo(map);
}


export const createOption = async (selection)=>{
  selection.innerHTML='<option value="" disabled selected>qHAWAX Móvil</option>'
  await noParametersRequest('mobile_log_info_during_trip')
  .then(e=>e.forEach(q_mobile=>{
 
    const option = document.createElement('option');
    option.setAttribute('value', q_mobile.name);
    option.innerText =	q_mobile.name+' :'+q_mobile.comercial_name ;
    selection.appendChild(option);
  }))
  .catch(e=>null)
}

export const startTrip = (q_mobile, selection)=>{

  socket.on(`${q_mobile.name}_startTrip`, data => {
    
    toast(`${q_mobile.name}: El qHAWAX Móvil ${q_mobile.comercial_name} ha empezado a registrar data válida.`,'orange darken-1 rounded');
    createOption(selection)
  })

};

export const finishTrip = (q_mobile, selection)=>{

  socket.on(`${q_mobile.name}_finishTrip`, data => {
    toast(`${q_mobile.name}: El qHAWAX Móvil ${q_mobile.comercial_name} terminó su viaje.`,'white-text blue darken-1 rounded');
    circlesArray.forEach(c=>removeLine(c))
    createOption(selection)
  })
  
};

export const finishPolylinesTrip = (q_mobile, polylinesArray)=>{
  socket.on(`${q_mobile.name}_finishTrip`, data => {
    polylinesArray.forEach(p => {
      removeLine(p);
      polylinesArray = polylinesArray.filter(item => item !== p);
    })
  });
};

export const latLng = (data)=>{
  const latlngLine = {
    lat: parseFloat(data.lat),
    lng: parseFloat(data.lon),
  };
  return latlngLine;
}

export const callSocketTrip = (q_mobile, map, selection) => {
  let flightPlanCoordinates = [];

  console.log("map markers: ", map.markers);
  const marker = map.markers.find(el => el.options.id === q_mobile.name + '_marker');

  const popup = L.popup().setContent(q_mobile.name);

  socket.on(`${q_mobile.name}_mobile`, async data => {
      console.log(data);
      const start = await lastStartTrip(q_mobile.name);
      const timer = intervalToDuration({ start: new Date(typeof start === 'string' ? new Date() : start.start_trip), end: new Date() });
      const latlngLine = [data.lat, data.lon];

      await noParametersRequest('mobile_log_info_during_trip')
          .then(e => e.forEach(q_mobile => {
              if (data.ID === q_mobile.name) {
                  flightPlanCoordinates.push([data.lat, data.lon]);
                  const polyline = L.polyline(flightPlanCoordinates).addTo(map);
              }
          }))
          .catch(e => null);

      popup.setContent(infoWindowM(data, q_mobile, timer));  // Asumo que infoWindowM retorna contenido HTML o texto.
      marker.bindPopup(popup).openPopup();

      // Asumiendo que finishPolylinesTrip también se adaptará.
      finishPolylinesTrip(q_mobile);
  });

  // Supongo que finishTrip también será adaptado.
  finishTrip(q_mobile, selection);
  marker.closePopup();
};

export const selectMobileTrip = async(element, map) => {
  let params = {};
  const selectionName = element.querySelector('#selectDrone');
  const selectionSensor = element.querySelector('#selectSensor');
  const drawBtn = element.querySelector('#draw-btn');
  createOption(selectionName);
  
  selectionName.addEventListener('change', e => {
      params.name = e.target.value;
      activateDrawBtn(drawBtn, params);
  });

  selectionSensor.addEventListener('change', e => {
      params.sensor = e.target.value;
      activateDrawBtn(drawBtn, params);
  });

  drawBtn.addEventListener('click', e => {
      flag = false;
      drawCirclesPollutant(params, map);
      circlesArray.forEach(c => removeLine(c));  // Asumiendo que removeLine también será adaptado.
  });
};

export const requestMobileQ = async (map, element) => {
  const mobile_list = await noParametersRequest('AllMobileQhawaxsInMap/');
  if (mobile_list.length === 0) {
      toast('No hay qHAWAX Móviles disponibles', 'grey darken-1 rounded');
  } else {
      // Inicializar los arrays si no existen.
      map.markers = map.markers || [];
      map.infowindows = map.infowindows || [];

      // Crear un arreglo de LatLng para ajustar el mapa posteriormente.
      let latLngs = [];

      mobile_list.forEach((q_mobile) => {
          const marker = newMarkerMobile(q_mobile, map);
          if (!marker) return; // Si no se pudo crear el marcador, simplemente regresamos.

          // Crear y configurar el popup para el marcador.
          const popup = L.popup().setContent(q_mobile.name);
          marker.bindPopup(popup);

          // Agregar el marcador y la ventana emergente a sus respectivas listas.
          map.markers.push(marker);
          map.infowindows.push(popup); 

          // Agregar al arreglo de LatLng.
          latLngs.push([q_mobile.lat, q_mobile.lon]);

          startTrip(q_mobile, element.querySelector('#selectDrone'));
          callSocketTrip(q_mobile, map, element.querySelector('#selectDrone'));
      });

      // Ajustar el mapa para que muestre todos los marcadores.
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds);
      if (map.getZoom() > 13) map.setZoom(13);
  }
};


  