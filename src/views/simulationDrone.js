import { navBarQhawax } from '../lib/navBarQhawax.js';
import { simulation} from '../lib/HtmlComponents.js';
import { requestQhawaxFlight, requestTelemetryFlight } from '../requests/get.js';

const telemetryFlight = async(id, start, end, map, element)=> {
  const flightPlanCoordinates = [];
  let polylinesArray = [];
  // const telemetry = await requestTelemetryFlight(id, start, end);
  // telemetry.forEach( t=> {

  // })
}

const simulationView = (id, start, end) => {

    const simulationElem = document.createElement('div');
    navBarQhawax(simulationElem, simulation);
    const map = new google.maps.Map(simulationElem.querySelector('#map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: { lat: -12.1215361, lng: -77.0463574},
        zoom: 8,
      });
    telemetryFlight(id, start, end, map, simulationElem)
    return simulationElem;
  };
  
  export { simulationView }