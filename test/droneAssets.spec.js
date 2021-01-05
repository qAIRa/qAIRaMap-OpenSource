import { showActiveDrones } from '../src/lib/droneAssets.js';
import { viewMap } from '../src/lib/HtmlComponents.js';
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
  })


const drone = {
    CO: 0,
    CO2: 30,
    H2S: 0,
    NO2: 0,
    O3: 0,
    PM1: 4.855,
    PM10: 28.552,
    PM25: 12.718,
    SO2: 0,
    UV: 0,
    UVA: 0,
    UVB: 0,
    VOC: 0.003,
    comercial_name: "Kawito Volador",
    humidity: 73.5,
    lat: -12.135387,
    lon: -77.025062,
    name: "qH022",
    pressure: 100652.24,
    qhawax_id: 22,
    qhawax_type: "AEREAL",
    spl: 0,
    state: "ON",
    temperature: 22.1,
    timestamp: "2020-12-10 18:23:14.0-05:00",

}

test('showActiveDrones', () => {
    document.body.innerHTML = viewMap;
    const map = new google.maps.Map(document.querySelector('#map'), {
    });
  map.markers = []
  expect(showActiveDrones(document, drone, map)).toBe(undefined);
  })

