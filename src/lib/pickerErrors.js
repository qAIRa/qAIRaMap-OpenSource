/**
 * Picker Materialize Error Handler
 * @module PickerErrors
 */
/**
 * Modal structure for Materialize that indicates the initial date must be lower than the final
 * @type {string}
 */
const modalDateAlert = `
<!-- Modal Structure -->
<div id="modalDate" class="modal data">
  <div class="modal-content center-align">
    <h5>Error de Fecha</h5>
    <p>	The initial date must be smaller than the final date</p>
    <i class="large material-icons">block</i>
  </div>
  <div class="modal-footer">
    <a  class="modal-close waves-effect waves-green btn-flat">OK</a>
  </div>
</div>
`;
/**
 * Modal structure for Materialize that indicates every option must be selected
 * @type {string}
 */

const modalEmptyAlert = `
<!-- Modal Structure -->
<div id="modalEmpty" class="modal empty">
  <div class="modal-content center-align">
    <h5>Information is missing</h5>
    <p>Please complete all fields</p>
    <i class="large material-icons">block</i>
  </div>
  <div class="modal-footer">
    <a  class="modal-close waves-effect waves-green btn-flat">OK</a>
  </div>
</div>
`;
const optionsModal = {
	onCloseEnd: () => window.location.reload(),
	outDuration: 800,
};

const openModalDateAlert = () => {
	const container = document.getElementById('content-page');
	const modalElem = document.createElement('div');
	modalElem.innerHTML = modalDateAlert;
	container.appendChild(modalElem);
	const modalsMenu = modalElem.querySelectorAll('.data');
	M.Modal.init(modalsMenu, optionsModal);
	const myModal = modalElem.querySelector('#modalDate');
	var instance = M.Modal.getInstance(myModal);
	instance.open();
};

const openModalEmptyAlert = () => {
	const container = document.getElementById('content-page');
	const modalElem = document.createElement('div');
	modalElem.innerHTML = modalEmptyAlert;
	container.appendChild(modalElem);
	const modalsMenu = modalElem.querySelectorAll('.empty');
	M.Modal.init(modalsMenu, optionsModal);
	const myModal = modalElem.querySelector('#modalEmpty');
	var instance = M.Modal.getInstance(myModal);
	instance.open();
};

/**
 * Recive the Date and Hour selected from form picker and converts it to a timestamp format
 * @param {array} arrayDate
 * @param {array} arrayHour
 * @returns {DOMHighResTimeStamp}
 */
const toTimestamp = (arrayDate, arrayHour) => {
	const timestamp = new Date(
		arrayDate[2],
		arrayDate[1] - 1,
		arrayDate[0],
		arrayHour[0] - 5,
		arrayHour[1]
	);

	return timestamp;
};

export { openModalDateAlert, openModalEmptyAlert, toTimestamp };
