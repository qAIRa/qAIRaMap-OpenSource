import { drawQhawaxMap } from '../lib/mapAssets.js';
import { navBarClient } from '../lib/navBarClient.js';
import { viewMap } from '../lib/HtmlComponents.js';
import { requestAllQhawax } from '../requests/get.js';

const request = async (map) => {
  const qhawax_list = await requestAllQhawax();
  qhawax_list.forEach((qhawax) => {
    if(qhawax.lat!==null)
      drawQhawaxMap(map, qhawax);
  });
};

const viewFreeMap = () => {
  const mapElem = document.createElement('div');
  navBarClient(mapElem, viewMap);

  const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);

  const map = new google.maps.Map(mapElem.querySelector('#map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  map.markers = [];
	map.latitude = [];
	map.longitude = [];

  // const socket = io.connect(`${SocketSource}`);
  // socket.on('update_inca', (res) => {
  //   if (qhawax.name === res.name) {
  //       qhawax.main_inca = res.main_inca;
  //       if(qhawax.lat!==null)
  //         drawQhawaxMap(map, qhawax);
  //   }
  // });

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
