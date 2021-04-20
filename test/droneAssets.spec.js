import {
    CallOnceToast,
    limitColor,
    circleColor,
    addLine,
    removeLine,
    createOption,
    newCircle,
    callSocketSensors,
    drawCirclesPollutant,
    activateDrawBtn,
    selectDroneFlight,
    landing,
    newPolyline,
    callSocketFlight,
    takeoff,
    newMarkerDrone,
    requestDrones
} from '../src/lib/droneAssets.js';
import { firstMap } from '../src/lib/mapAssets.js';
import { initialize } from "@googlemaps/jest-mocks";
import {droneSelection} from '../src/html/freeMapDrone.js'
import { enableFetchMocks } from 'jest-fetch-mock';
// import io from 'socket.io';



enableFetchMocks()

beforeEach(() => {
    initialize();
    fetch.resetMocks()
    jest.restoreAllMocks();
  })

test('call toast only once', () => {
    global.M = require('../build/js/materialize.min.js');
  expect(CallOnceToast(false,-1)).toStrictEqual(false);
  expect(CallOnceToast(true,1)).toStrictEqual(true);
  })

test('limits for the pollutants', () => {
  expect(limitColor(-1,50,100,150)).toStrictEqual("#FFFFFF");
  expect(limitColor(49,50,100,150)).toStrictEqual("#009966");
  expect(limitColor(99,50,100,150)).toStrictEqual("#ffde33");
  expect(limitColor(149,50,100,150)).toStrictEqual("#ff9933");
  expect(limitColor(151,50,100,150)).toStrictEqual("#cc0033");
  })

test('color of the circle', () => {
  expect(circleColor({sensor:'CO'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'O3'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'SO2'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'H2S'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'NO2'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'PM10'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'PM25'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'hi'})).toStrictEqual("#FFFFFF");
  })

  test('add a polyline', () => {
    let polyline = {
        setMap:jest.fn()
    };
  expect(addLine(polyline,firstMap)).toStrictEqual(undefined);
  })
  test('remove a polyline', () => {
    let polyline = {
        setMap:jest.fn()
    };
  expect(removeLine(polyline)).toStrictEqual(undefined);
  })

  test('create the options', () => {
    fetch.mockResponses([
      JSON.stringify({name:'qH006', comercial_name:'Wakanda'},{name:'qH007', comercial_name:'Metropolis'}),
      {status:200}
    ])
    document.body.innerHTML=droneSelection;
  expect(createOption(document,firstMap)).toStrictEqual(Promise.resolve({}));
  })

  test('create new circle', () => {
    google.maps.Circle=jest.fn();
  expect(newCircle({center:{lat:-12,lng:-77}, firstMap})).toStrictEqual(undefined);
  })

  test('active drawing button', () => {
      const mockedElementDOM = { classList: { remove: jest.fn(), add: jest.fn() } };
  expect(activateDrawBtn(mockedElementDOM,{name:'qH006',sensor:'CO'})).toStrictEqual(undefined);
  expect(activateDrawBtn(mockedElementDOM,{name:1,sensor:'CO'})).toStrictEqual(undefined);
  })

  test('select a flight', () => {
expect(selectDroneFlight(document, firstMap)).toStrictEqual(Promise.resolve({}));
})

test('create new polyline', () => {
    google.maps.Polyline=jest.fn();
    const constructor = new google.maps.Polyline();
  expect(newPolyline({lat:-12,lng:-77})).toStrictEqual(constructor);
  })

  test('create new marker', () => {
    google.maps.Marker=jest.fn();
    const constructor = new google.maps.Marker();
  expect(newMarkerDrone({name:'qH006', position:'{"lat":-12,"lng":-77}'}, firstMap)).toStrictEqual(constructor);
  })

  test('draw a circle', () => {
    fetch.mockResponses([
		JSON.stringify({"pollutant": 21.261,"timestamp_zone": "Mon, 08 Feb 2021 21:21:30 GMT","lat":-12, "lon":-77, "comercial_name":"Wakanda" },{"pollutant": 21.261,"timestamp_zone": "Mon, 08 Feb 2021 21:21:30 GMT","lat":-12, "lon":-77, "comercial_name":"Wakanda" }),
		{status:200}
	])
    expect(drawCirclesPollutant(document, firstMap)).toStrictEqual(Promise.resolve({}));
    })
   
test('request drones', () => {
  fetch.mockResponses([
		JSON.stringify( {"area_name":"Residential Zone","comercial_name":"Wakanda Awakening","eca_noise_id":2,"id":179,"lat":-12.3578897,"lon":-76.7912213,"main_inca":-2.0,"mode":"Calibration","name":"qH006","qhawax_id":179,"qhawax_type":"AEREAL","state":"OFF"},{"area_name":"Special Protection Zone","comercial_name":"Aereo Prueba","eca_noise_id":1,"id":184,"lat":-11.998472864017,"lon":-76.9984387510529,"main_inca":-1.0,"mode":"Customer","name":"qH058","qhawax_id":184,"qhawax_type":"AEREAL","state":"OFF"}),
		{status:200}
	])
  const map = new google.maps.Map(document.querySelector('#map'), {
	});
  expect(requestDrones(map, document)).toStrictEqual(Promise.resolve({}));
  })

  // test('takeoff', () => {
  //   jest.mock('socket.io', () => {
  //     const socket = {
  //       on: jest.fn()
  //     };
  //     return jest.fn(() => socket);
  //   });
  //   const socket = io();
  //   const drone = { name: 'qH006'}
  //   expect(socket.on).toBeCalledWith(`${drone.name}_takeoff`);
  //   const logSpy = jest.spyOn(console, 'log');
  //   expect(logSpy).toBeCalledWith('do something');
  // expect(takeoff(drone, document)).toBe('');
  // })