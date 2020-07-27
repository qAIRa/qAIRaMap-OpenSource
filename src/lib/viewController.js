//@ts-check
/**
 * Picker Materialize Error Handler
 * @module ViewController
 */
import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';
import { viewDashboard } from '../views/dashboardView.js';
import { viewGraphics } from '../views/graphicsView.js';



/**
 * Container that alouds to insert changes in the index Html
 * @type {HTMLElement}
 */
const container = document.getElementById('content-page');


/**
 * View Controller alouds to change html on Hash Change
 * @param {string} router - Name of the View
 * @returns {HTMLDivElement} - Append an HTML Div to the index Html
 */

const changeView = router => {
	container.innerHTML = '';
	switch (router) {
		case '':
			return container.appendChild(viewFreeMap());

		case '#/':
			return container.appendChild(viewFreeMap());

		case '#/download':
			return container.appendChild(downloadView());

		case '#/dashboard':
			return  container.appendChild(viewDashboard());
		
		case '#/graphics':
			return  container.appendChild(viewGraphics());
		default:
			return container.appendChild(viewFreeMap());
	}
};

const goTo = (location)=>{
    window.location.assign(`..#/${location}`);
    window.location.reload();
}

export { changeView , goTo};
