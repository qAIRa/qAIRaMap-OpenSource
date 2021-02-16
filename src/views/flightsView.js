import { flightViewElem, card } from '../html/flights.js';
import { navBarQhawax } from '../lib/navBarQhawax.js';
import { requestFlightList } from '../requests/get.js';
import { goTo } from '../lib/viewController.js';
import { toast } from '../lib/helpers.js';

const selectedParameters = {};;
const time= ' 00:00:00';
const options ={
  format: 'dd-mm-yyyy',
}

const initDatePicker = (element) =>{
      options.maxDate = new Date();
      options.onClose = () => {
        selectedParameters.initDate = datePicker[0].value+time;
        selectedParameters.endDate = datePicker[1].value+time;
      };
      const datePicker = element.querySelectorAll('.datepicker');
      M.Datepicker.init(datePicker, options);
}

const flightRequest = async(init, end, element) => {
  const flights = await requestFlightList(init, end);
  const formFlight = element.querySelector('.form-flights');
  if (flights.length===0){
    toast(`There are no flights in the period selected.`,'green darken-1 rounded')
  }else{
      formFlight.classList.add('none')
      element.innerHTML += `
        <div class="center-align">
        <button id="new-search-btn" class="btn waves-effect waves-light" style="
        margin-top: 1em;
        margin-bottom: 1em;">New Search
        <i class="material-icons right">send</i>
        </button>
        </div>
        `
        console.log(flights);
      flights.forEach(f => element.innerHTML += card(f));
        
      const newSearchBtn =  element.querySelector('#new-search-btn')
      newSearchBtn.addEventListener('click', e=> goTo('flightsDrone'))
      const simulationBtnArray= element.querySelectorAll('.simulation-btn')
      simulationBtnArray.forEach(btn =>{
        btn.addEventListener('click',e=>{
          sessionStorage.setItem('qname', btn.id);
          sessionStorage.setItem('start', btn.dataset.start);
          sessionStorage.setItem('end', btn.dataset.end);
          goTo('simulationDrone')

        })
      })
    };
};

const flightsView = () => {
  const flightElem = document.createElement('div');
  flightElem.classList.add('row')
  navBarQhawax(flightElem, flightViewElem);
  initDatePicker(flightElem)
  const flightBtn = flightElem.querySelector('#submit-btn');
  flightBtn.addEventListener('click', (e) => {
    e.preventDefault()
    flightRequest(selectedParameters.initDate,selectedParameters.endDate, flightElem)
  });

  return flightElem;
};

export { flightsView }
