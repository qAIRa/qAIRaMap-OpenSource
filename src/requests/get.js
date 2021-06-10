import { APISource } from '../index.js';
import { toast} from '../lib/helpers.js';

export const handleError = (err) => {
  toast(`Please check your internet connection.`,'grey darken-1 rounded')
return  new Response(JSON.stringify({
  code: 400,
  message: 'Network error',
}))

};

export const noParametersRequest = async(address)=>{
  try{
    const response = await fetch(`${APISource+address}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const oneParameterRequest = async (address, ID)=>{
  try{
    const response = await fetch(`${APISource+address+ID}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const requestAverageMeasurement = async (qhawax, sensor)=>{
  try{
    const response = await fetch(`${APISource}gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const downloadData = async(id, init, end)=>{
  try{
    const response = await fetch(`${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}


export const requestGraphicsData = async(qhawax, time)=>{
  try{
    const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const requestFlightList = async(init, end)=>{
  try{
    const response = await fetch(`${APISource}get_drone_flights_period_time?initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const requestTripList = async(init, end)=>{
  try{
    const response = await fetch(`${APISource}get_mobile_trips_period_time?initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}


export const requestQhawaxFlight = async(name, init, end)=>{
  try{
    const response = await fetch(`${APISource}processed_measurements_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const requestQhawaxTrip = async(name, init, end)=>{
  try{
    const response = await fetch(`${APISource}valid_processed_measurements_mobile_qhawax?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const requestTelemetryFlight = async(name, init, end)=>{
  try{
    const response = await fetch(`${APISource}telemetry_andean_drone?qhawax_name=${name}&initial_timestamp=${init}&final_timestamp=${end}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const lastStartFlight = async(name)=>{
  try{
    const response = await fetch(`${APISource}flight_log_info_by_qhawax_name/?name=${name}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const lastStartTrip = async(name)=>{
  try{
    const response = await fetch(`${APISource}mobile_log_info_by_qhawax_name/?name=${name}`)
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const getInFlightSensor = async(data)=>{
  try{
    const response = await fetch(`${APISource}measurements_by_pollutant_during_flight/?name=${data.name}&pollutant=${data.sensor}`)
    if(response.status===500)return [];
    return await response.json();
  }catch(e){
    handleError(e)
  }
}

export const getInTripSensor = async(data)=>{
  try{
    const response = await fetch(`${APISource}measurements_by_pollutant_during_trip/?name=${data.name}&pollutant=${data.sensor}`)
    if(response.status===500)return [];
    return await response.json();
  }catch(e){
    handleError(e)
  }
}


