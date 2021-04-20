import { flightViewElem, card, newSearch_btn } from '../html/flights.js';
import { navBarQhawax } from '../lib/navBarQhawax.js';
import { requestFlightList } from '../requests/get.js';
import { goTo } from '../lib/viewController.js';
import { toast } from '../lib/helpers.js';

const selectedParameters = {};;
const time_start= ' 00:00:00';
const time_end = ' 23:59:59'
const options ={
  format: 'dd-mm-yyyy',
}

export const initDatePicker = (element) =>{
      options.maxDate = new Date();
      options.onClose = () => {
        selectedParameters.initDate = datePicker[0].value+time_start;
        selectedParameters.endDate = datePicker[1].value+time_end;
      };
      const datePicker = element.querySelectorAll('.datepicker');
      M.Datepicker.init(datePicker, options);
}

export const flightRequest = async(init, end, element) => {
  const flights = await requestFlightList(init, end);
  const formFlight = element.querySelector('.form-flights');
  if (flights.length===0){
    toast(`There are no flights in the period selected.`,'green darken-1 rounded')
  }else{
      formFlight.classList.add('none')
      element.innerHTML += newSearch_btn;
      flights.forEach(f => element.innerHTML += card(f));
        
      const newSearchBtn =  element.querySelector('#new-search-btn')
      newSearchBtn.addEventListener('click', e=> goTo('flightsDrone'))
      const simulationBtnArray= element.querySelectorAll('.simulation-btn')
      simulationBtnArray.forEach(btn =>{
        btn.addEventListener('click',e=>{
          sessionStorage.setItem('flight',JSON.stringify({
            'name': btn.id,
            'comercial_name':btn.dataset.comercialname,
            'start': btn.dataset.start,
            'end': btn.dataset.end,
            'position':JSON.stringify({'lat':parseFloat(btn.dataset.lat),'lng':parseFloat(btn.dataset.lng)})
          }));
          goTo('simulationDrone')

        })
      })
    };
};

export const flightsView = () => {
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

