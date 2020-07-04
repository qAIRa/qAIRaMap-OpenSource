//@ts-check
/**
 * Picker Materialize Error Handler
 * @module ViewController
 */
import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';



/**
 * Container that alouds to insert changes in the index Html
 * @type {HTMLElement}
 */
const container = document.getElementById('content-page');

/**
 * Company ID - Client ID
 * @type {number}
 */
const company_id = Number(sessionStorage.getItem('companyID'));
const user_name = sessionStorage.getItem('companyName');
const user_id = Number(sessionStorage.getItem('user_id'));
const username = sessionStorage.getItem('username');

/**
 * View Controller alouds to change html on Hash Change
 * @param {string} router - Name of the View
 * @returns {HTMLDivElement} - Append an HTML Div to the index Html
 */

const changeView = router => {
	container.innerHTML = '';
	switch (router) {
		case '':
			return container.appendChild(viewFreeMap(0));

		case '#/':
			return container.appendChild(viewFreeMap(0));

		case '#/download':
			return container.appendChild(downloadView(company_id))

	}
};

export { changeView };
