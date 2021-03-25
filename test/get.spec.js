import { 
    requestAverageMeasurement,
    noParametersRequest,
    oneParameterRequest,
    downloadData,
    handleError,
    requestGraphicsData,
    requestFlightList,
    requestQhawaxFlight,
    requestTelemetryFlight,
    lastStartFlight,
    getInFlightSensor
} from '../src/requests/get.js';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
 
  })


test('handle error', () =>{
   global.M = require('../build/js/materialize.min.js');
  expect(handleError('error').statusText).toStrictEqual('OK');
});

//oneParameterRequest

it("catches errors oneParameterRequest", async()=>{
  fetch.mockReject(()=>handleError(e));
  const installation_date = await oneParameterRequest("GetInstallationDate/?qhawax_id=",179);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/GetInstallationDate/?qhawax_id=179`
  );
});


it("get installation date - oneParameterRequest", async () =>{
  const installation_date = await oneParameterRequest("GetInstallationDate/?qhawax_id=",179);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/GetInstallationDate/?qhawax_id=179`
  );
});

//noParametersRequest

it("catches errors noParametersRequest", async()=>{
  fetch.mockReject(()=>handleError(e));
  const installation_date = await noParametersRequest("AllQhawaxInMap/");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/AllQhawaxInMap/`
  );
})

it("get all qhawax in map - noParametersRequest", async()=>{
  const installation_date = await noParametersRequest("AllQhawaxInMap/");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/AllQhawaxInMap/`
  );
})

//requestAverageMeasurement

it("catches errors requestAverageMeasurement", async()=>{
  fetch.mockReject(()=>handleError(e));
  const average_measurement = await requestAverageMeasurement("qH021","SO2");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/gas_average_measurement/?qhawax=qH021&gas=SO2`
  );
})

it("calls request average measurement", async()=>{
  const average_measurement = await requestAverageMeasurement("qH021","SO2");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/gas_average_measurement/?qhawax=qH021&gas=SO2`
  );
})

//downloadData

it("catches errors downloadData", async()=>{
  fetch.mockReject(()=>handleError(e));
  const download_data = await downloadData("qH004","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/average_valid_processed_period/?qhawax_id=qH004&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

it("calls download data", async()=>{
  const download_data = await downloadData("qH004","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/average_valid_processed_period/?qhawax_id=qH004&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

//requestGraphicsData

it("catches errors requestGraphicsData", async()=>{
  fetch.mockReject(()=>handleError(e));
  const request_graphics_data = await requestGraphicsData("qH004",5);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/processed_measurements/?name=qH004&interval_minutes=5`
  );
})

it("calls request graphics data", async()=>{
  const request_graphics_data = await requestGraphicsData("qH004",5);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/processed_measurements/?name=qH004&interval_minutes=5`
  );
})

//requestFlightList

it("catches errors requestFlightList", async()=>{
  fetch.mockReject(()=>handleError(e));
  const request_graphics_data = await requestFlightList("04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/get_drone_flights_period_time?initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

it("calls request flight list", async()=>{
  const request_graphics_data = await requestFlightList("04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/get_drone_flights_period_time?initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

//requestQhawaxFlight

it("catches errors requestQhawaxFlight", async()=>{
  fetch.mockReject(()=>handleError(e));
  const request_qhawax_flight = await requestQhawaxFlight("qH006","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/processed_measurements_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

it("calls request qhawax flight", async()=>{
  const request_qhawax_flight = await requestQhawaxFlight("qH006","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/processed_measurements_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})


//requestTelemetryFlight

it("catches errors requestTelemetryFlight", async()=>{
  fetch.mockReject(()=>handleError(e));
  const request_telemetry_flight = await requestTelemetryFlight("qH006","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/telemetry_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})

it("calls request telemetry flight", async()=>{
  const request_telemetry_flight = await requestTelemetryFlight("qH006","04-01-2021 15:00:00", "04-01-2021 18:00:00");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/telemetry_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00`
  );
})


//lastStartFlight

it("catches errors lastStartFlight", async()=>{
  fetch.mockReject(()=>handleError(e));
  const last_start_flight = await lastStartFlight("qH006");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/flight_log_info_by_qhawax_name/?name=qH006`
  );
})

it("calls last start flight", async()=>{
  const last_start_flight = await lastStartFlight("qH006");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/flight_log_info_by_qhawax_name/?name=qH006`
  );
})


//getInFlightSensor

it("catches errors getInFlightSensor", async()=>{
  fetch.mockReject(()=>handleError(e));
  const last_start_flight = await getInFlightSensor({'name':'qH006', 'sensor':'CO'});
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/measurements_by_pollutant_during_flight/?name=qH006&pollutant=CO`
  );
})

it("calls get in flight sensor", async()=>{
  const last_start_flight = await getInFlightSensor({'name':'qH006', 'sensor':'CO'});
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://openqairamapnapi.qairadrones.com/api/measurements_by_pollutant_during_flight/?name=qH006&pollutant=CO`
  );
})




