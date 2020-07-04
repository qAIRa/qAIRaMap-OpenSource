import { drawQhawaxMap, mapCenter, zoomByCompany } from '../lib/mapAssets.js';
import {navbar,
legend,
dropdownLegend,
legendMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
} from '../lib/navMenus.js';
import { viewMap} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany} from '../requests/get.js';

const viewFreeMap = company => {
	
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	

	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = legend;
	menuNavMobile.innerHTML = spinMob+legendMobile;
	mapElem.innerHTML = viewMap;
	chooseSpinnerMenu(company);

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);
	const modals2 = document.querySelectorAll('.modal');
	M.Modal.init(modals2);
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	styledNavBar(company);

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: mapCenter(company),
		zoom: zoomByCompany(company),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	map.markers = [];
	const request = async () => {
   
		const qhawax_list = await requestAllQhawaxByCompany(company);
		qhawax_list.forEach(qhawax => {

			drawQhawaxMap(map, qhawax, company);
		});
	};
		
		const socket = io.connect(
			'https://qairamapnapi.qairadrones.com/'
		);
		socket.on('update_inca', res => {
			if (qhawax.name === res.name) {
				qhawax.main_inca = res.main_inca;

				drawQhawaxMap(map, qhawax, company);
			}
		});

		request();

	return mapElem;
};

export { viewFreeMap };
