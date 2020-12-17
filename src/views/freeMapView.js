import { drawQhawaxMap } from '../lib/mapAssets.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap } from '../lib/HtmlComponents.js';
import { requestAllQhawax } from '../requests/get.js';

const request = async (map) => {
  const qhawax_list = await requestAllQhawax();
  qhawax_list.forEach((qhawax) => {
    drawQhawaxMap(map, qhawax);
  });
};

const viewFreeMap = () => {
  const mapElem = document.createElement('div');
  navBarClient(mapElem, viewMap);

  const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    center: {
      lat: -12.04318,
      lng: -77.02824,
    },
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  map.markers = [];
	map.latitude = [];
	map.longitude = [];

  const socket = io.connect(
    'https://qairamapnapi-dev-opensource.qairadrones.com/',
  );
  socket.on('update_inca', (res) => {
    if (qhawax.name === res.name) {
      qhawax.main_inca = res.main_inca;

      drawQhawaxMap(map, qhawax);
    }
  });

  request(map);

  mapElem.querySelector('#over_map').addEventListener('mouseenter',(e)=>{
		M.Toast.dismissAll();
		M.toast({html: 'You can click on a leaf for more information.',
		classes: 'orange darken-1 rounded',
		displayLength: 2000})
  })
  return mapElem;
};

export { viewFreeMap };
