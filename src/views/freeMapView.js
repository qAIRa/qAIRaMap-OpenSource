import { drawQhawaxMap , firstMap } from '../lib/mapAssets.js';
import { navBarQhawax } from '../lib/navBarQhawax.js';
import { viewMap } from '../html/freeMap.js';
import { noParametersRequest} from '../requests/get.js';
import { toast } from '../lib/helpers.js';

const request = async (map) => {
 await noParametersRequest('AllQhawaxInMap/')
 .then(q=>q.forEach((qhawax) => {
  if(qhawax.lat!==null && qhawax.qhawax_type!=='AEREAL')
    drawQhawaxMap(map, qhawax);
}))
};

const viewFreeMap = () => {
  const mapElem = document.createElement('div');
  navBarQhawax(mapElem, viewMap);

  const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);

  const map = firstMap(mapElem, 'map')

  request(map);

  mapElem.querySelector('#over_map').addEventListener('mouseenter',(e)=>{
		M.Toast.dismissAll();
    toast('You can click on a leaf for more information.','orange darken-1 rounded')
  })
  return mapElem;
};

export { viewFreeMap };
