import { tripViewElem, card, newSearch_btn } from '../html/trips.js';
import { navBarQhawax } from '../lib/navBarQhawax.js';
import { requestTripList } from '../requests/get.js';
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
  const flights = await requestTripList(init, end);
  const formFlight = element.querySelector('.form-flights');
  if (flights.length===0){
    toast(`There are no trips in the period selected.`,'green darken-1 rounded')
  }else{
      formFlight.classList.add('none')
      element.innerHTML += newSearch_btn;
      flights.forEach(f => element.innerHTML += card(f));
        
      const newSearchBtn =  element.querySelector('#new-search-btn')
      newSearchBtn.addEventListener('click', e=> goTo('flightsDrone'))
      const simulationBtnArray= element.querySelectorAll('.simulation-btn')
      simulationBtnArray.forEach(btn =>{
        console.log(btn);
        btn.addEventListener('click',e=>{
          sessionStorage.setItem('trip',JSON.stringify({
            'name': btn.id,
            'comercial_name':btn.dataset.comercialname,
            'start': btn.dataset.start,
            'end': btn.dataset.end,
            'position':JSON.stringify({'lat':parseFloat(btn.dataset.lat),'lng':parseFloat(btn.dataset.lng)})
          }));
          goTo('simulationMobileQ')

        })
      })
    };
};

export const tripMobileView = () => {
  const tripElem = document.createElement('div');
  tripElem.classList.add('row')
  navBarQhawax(tripElem, tripViewElem);
  initDatePicker(tripElem)
  const tripBtn = tripElem.querySelector('#submit-btn');
  tripBtn.addEventListener('click', (e) => {
    e.preventDefault()
    flightRequest(selectedParameters.initDate,selectedParameters.endDate, tripElem)
  });

  return tripElem;
};

