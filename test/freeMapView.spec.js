import { viewFreeMap } from '../src/views/freeMapView.js';
import { viewMap } from '../src/html/freeMap.js';
import { initialize } from "@googlemaps/jest-mocks";
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks()



beforeEach(() => {
	initialize();
  fetch.resetMocks()
})

  
  test('viewFreeMap', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    global.M = require('../build/js/materialize.min.js');
    document.body.innerHTML = '<header></header>' + viewMap;
    fetch.mockResponses([
      JSON.stringify( {"area_name":"Residential Zone","comercial_name":"Wakanda Awakening","eca_noise_id":2,"id":179,"lat":-12.3578897,"lon":-76.7912213,"main_inca":-2.0,"mode":"Calibration","name":"qH006","qhawax_id":179,"qhawax_type":"AEREAL","state":"OFF"},{"area_name":"Special Protection Zone","comercial_name":"Aereo Prueba","eca_noise_id":1,"id":184,"lat":-11.998472864017,"lon":-76.9984387510529,"main_inca":-1.0,"mode":"Customer","name":"qH058","qhawax_id":184,"qhawax_type":"AEREAL","state":"OFF"}),
      {status:200}
    ])
  expect(viewFreeMap().toString()).toBe('[object HTMLDivElement]');
  })