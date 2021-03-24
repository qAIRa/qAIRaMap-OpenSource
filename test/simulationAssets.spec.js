import {
CallOnceToast,
callOnceMarker,
indexed,
drawSensorValues,
stopFlight,
drawTelemetry,
downloadDrone,
simulateFlight} 
from '../src/lib/simulationAssets.js'
import { firstMap} from '../src/lib/mapAssets.js';
import { droneSelection, viewDrones } from '../src/html/freeMapDrone.js';
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
  })

test('call toast only once', () => {
    global.M = require('../build/js/materialize.min.js');
  expect(CallOnceToast(false,-1)).toStrictEqual(false);
  expect(CallOnceToast(true,1)).toStrictEqual(true);
  })

test('call marker only once', () => {
    google.maps.Map=jest.fn();
    google.maps.InfoWindow=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    firstMap.fitBounds=jest.fn();
    firstMap.infowindows=[]
    firstMap.markers=[]
  expect(callOnceMarker(false, {name:'qH006', position:'{"lat":-12,"lon":-77}'}, firstMap)).toStrictEqual(false);
  })
  
const data = [{"CO":19756.486,"CO2":0.0,"CO_ug_m3":22719.959,"H2S":4508.708,"H2S_ug_m3":6267.104,"I_temperature":25.9,"NO":null,"NO2":135.725,"NO2_ug_m3":255.163,"O3":-2470.486,"O3_ug_m3":-4842.153,"PM1":1.476,"PM10":27.698,"PM25":4.778,"SO2":null,"SO2_ug_m3":null,"UV":null,"UVA":null,"UVB":null,"VOC":null,"alt":null,"humidity":80.6,"lat":0.0,"lon":0.0,"pressure":10.071,"spl":null,"temperature":26.0,"timestamp_zone":"Wed, 10 Mar 2021 13:50:42 GMT"},{"CO":19756.49,"CO2":0.0,"CO_ug_m3":22719.964,"H2S":4508.71,"H2S_ug_m3":6267.107,"I_temperature":25.9,"NO":null,"NO2":137.407,"NO2_ug_m3":258.325,"O3":-2476.966,"O3_ug_m3":-4854.853,"PM1":1.54,"PM10":29.096,"PM25":5.174,"SO2":null,"SO2_ug_m3":null,"UV":null,"UVA":null,"UVB":null,"VOC":null,"alt":null,"humidity":80.6,"lat":0.0,"lon":0.0,"pressure":10.071,"spl":null,"temperature":26.0,"timestamp_zone":"Wed, 10 Mar 2021 13:50:44 GMT"}]
const indexedData = {"0": {"CO": 19756.486, "center": {"lat": 0, "lng": 0}, "sensor": "CO"}, "1": {"CO": 19756.49, "center": {"lat": 0, "lng": 0}, "sensor": "CO"}}
test('index data', () => {
  expect(indexed(data,{sensor:'CO'})).toStrictEqual(indexedData);
  })


test('draw sensor values', () => {
    google.maps.Map=jest.fn();
    google.maps.InfoWindow=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    firstMap.infowindows=[]
    firstMap.markers=[]
  expect(drawSensorValues({name:'qH006'}, firstMap)).toStrictEqual(Promise.resolve({}));
  })

test('stop the flight', () => {
    google.maps.Map=jest.fn();
    google.maps.InfoWindow=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    firstMap.infowindows=[]
    firstMap.markers=[]
    document.body.innerHTML=viewDrones+droneSelection;
  expect(stopFlight({name:'qH006'}, firstMap, document)).toStrictEqual(true);
  })

test('draw the telemetry of the andean drone', () => {
    google.maps.Map=jest.fn();
    google.maps.InfoWindow=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    firstMap.infowindows=[]
    firstMap.markers=[]
    document.body.innerHTML=viewDrones+droneSelection;
  expect(drawTelemetry({name:'qH006',start:'04-01-2021 15:00:00',end: '04-01-2021 18:00:00'}, firstMap, document)).toStrictEqual(Promise.resolve({}));
  })