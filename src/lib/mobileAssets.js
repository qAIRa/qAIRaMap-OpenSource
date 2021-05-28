import { noParametersRequest, lastStartTrip, getInTripSensor } from '../requests/get.js';
import {socket} from '../index.js';
import { toast } from '../lib/helpers.js';
import { addLine, removeLine, newPolyline, activateDrawBtn, newCircle} from './droneAssets.js';
import { intervalToDuration } from 'date-fns';
import {infoWindowM} from '../lib/infowindow.js';

let latlngLine = {};
let circlesArray = [];
let flag = false;

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
   toast(`There are no measurements for ${params.name} on sensor ${params.sensor}`,'grey darken-1 rounded')
  }
 
 }
export const newMarkerMobile = (q_mobile,map)=>new google.maps.Marker({
    position: JSON.parse(q_mobile.position),
    map: map,
    icon: {
    url: 'img/qhawax_movil.png',
    scaledSize: new google.maps.Size(80, 80),
    },
    id: q_mobile.name + '_marker',
  });

export const createOption = async (selection)=>{
  selection.innerHTML='<option value="" disabled selected>qHAWAX Mobile</option>'
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
    
    toast(`${q_mobile.name}: The Mobile qHAWAX ${q_mobile.comercial_name} started to record valid data.`,'orange darken-1 rounded');
    createOption(selection)
  })

};

export const finishTrip = (q_mobile, selection)=>{

  socket.on(`${q_mobile.name}_finishTrip`, data => {
    toast(`${q_mobile.name}: The Andean Drone ${q_mobile.comercial_name} has landed now.`,'white-text blue darken-1 rounded');
    circlesArray.forEach(c=>removeLine(c))
    createOption(selection)
  })
  
};


export const callSocketTrip = (q_mobile, map, selection) => {
  let flightPlanCoordinates = [];
  let polylinesArray = [];

  const marker=map.markers.find(el=>el.id===q_mobile.name+'_marker')
  const infowindow = map.infowindows.find(el=>el.id===q_mobile.name+'_infowindow')
  // const bounds = new google.maps.LatLngBounds();
		socket.on(`${q_mobile.name}_mobile`, async data => {
     
      const start = await lastStartTrip(q_mobile.name)
      
      const timer=intervalToDuration({start:new Date(typeof start==='string'?new Date():start.start_trip),end:new Date()})
      latlngLine = {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon),
      };
            await noParametersRequest('mobile_log_info_during_trip')
            .then(e=>e.forEach(q_mobile=>{
     
              if (data.ID===q_mobile.name) {
                
                flightPlanCoordinates.push(new google.maps.LatLng(data.lat, data.lon))
                const polyline = newPolyline(flightPlanCoordinates)
              
                addLine(polyline,map)
                polylinesArray.push(polyline)
               
              }
            }))
            .catch(e=>null)
        marker.setPosition(latlngLine)
        infowindow.setContent(infoWindowM(data,q_mobile,timer))
        infowindow.open(map, marker);
        // bounds.extend(new google.maps.LatLng(data.lat, data.lon))
        // map.fitBounds(bounds);
        socket.on(`${q_mobile.name}_finishTrip`, data => {
         
   
          polylinesArray.forEach(p=>{
            removeLine(p);
            polylinesArray = polylinesArray.filter(item => item !== p);
            
            
            
          })
        });

    })
    finishTrip(q_mobile,selection)
    infowindow.close()
}
export const selectMobileTrip = async(element, map) =>{
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
    flag = false;
    drawCirclesPollutant(params,map)
    circlesArray.forEach(c=>removeLine(c)) 
  
  })

}



export const requestMobileQ = async (map, element) => {
    const mobile_list = await noParametersRequest('AllMobileQhawaxsInMap/');
    if (mobile_list.length===0) {
        toast('No mobile qHAWAX available','grey darken-1 rounded')
    } else {
        mobile_list.forEach((q_mobile) => {
              q_mobile.position=JSON.stringify({'lat':parseFloat(q_mobile.lat),'lng':parseFloat(q_mobile.lon)});
              const marker = newMarkerMobile(q_mobile,map)
              const infowindow = new google.maps.InfoWindow({id:q_mobile.name+'_infowindow'});
              map.infowindows.push(infowindow)
              map.markers.push(marker)
             
              const bounds = new google.maps.LatLngBounds();
              map.markers.forEach(m=> bounds.extend(m.getPosition()))
              map.fitBounds(bounds)
              startTrip(q_mobile, element.querySelector('#selectDrone'))
              callSocketTrip(q_mobile,map, element.querySelector('#selectDrone'))
              ;})
              selectMobileTrip(element,map)
              
    }
   
  };