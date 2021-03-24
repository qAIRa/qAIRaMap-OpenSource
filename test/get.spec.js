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


  describe('testing fetch calls', () => {
    
    
    it('calls oneParameterRequest', () => {
      fetch.mockResponseOnce('calls oneParameterRequest')
     
      //assert on the response
      oneParameterRequest('GetInstallationDate/?qhawax_id=','qH004').then(res => {
        expect(res).toEqual('calls oneParameterRequest')
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/GetInstallationDate/?qhawax_id=qH004')
    })

    it('calls noParametersRequest', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls noParametersRequest' }))
        
        //assert on the response
        noParametersRequest('AllQhawaxInMap/').then(res => {
          expect(res.data).toEqual('calls noParametersRequest')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/AllQhawaxInMap/')
      });

      // it('calls status', () => {
      //   fetch.mockResponseOnce('calls status');
     
      //   //assert on the response
      //   requestStatus(4).then(res => {
      //     expect(res).toEqual('calls status')
      //   })
      //   //assert on the times called and arguments given to fetch
      //   expect(fetch.mock.calls.length).toEqual(1)
      //   expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/qhawax_status/?name=4')
      // })
      it('calls download data', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls download data'}))
        fetch.mockReject(new Error('fake error message'))
       
        //assert on the response
        downloadData('qH004','04-01-2021 15:00:00', '04-01-2021 18:00:00').then(res => {
          expect(res.data).toEqual('calls download data')

        })
        // downloadData(false, 4,'01-09-2020 05:00:00', '01-09-2020 18:00:00').then(res => {
            
        //   })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        // expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=4&initial_timestamp=01-09-2020 05:00:00&final_timestamp=01-09-2020 18:00:00')
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/average_valid_processed_period/?qhawax_id=qH004&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00')
      });

      it('calls requestFlightList', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'requestFlightList'}))
        fetch.mockReject(new Error('fake error message'))
       
        //assert on the response
        requestFlightList('04-01-2021 15:00:00', '04-01-2021 18:00:00').then(res => {
          expect(res.data).toEqual('requestFlightList')

        })
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/get_drone_flights_period_time?initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00')
      });



      it('calls average measurements', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls average measurements'}))
        
        //assert on the response
        requestAverageMeasurement(4,'CO').then(res => {
          expect(res.data).toEqual('calls average measurements')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/gas_average_measurement/?qhawax=4&gas=CO')
      })
      it('calls graphics Data', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls graphics Data'}))
        
        //assert on the response
        requestGraphicsData('qH004',5).then(res => {
          expect(res.data).toEqual('calls graphics Data')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/processed_measurements/?name=qH004&interval_minutes=5')
      })

      it('calls data of andean drone', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'data of andean drone'}))
        
        //assert on the response
        requestQhawaxFlight('qH006','04-01-2021 15:00:00', '04-01-2021 18:00:00').then(res => {
          expect(res.data).toEqual('data of andean drone')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/processed_measurements_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00')
      })

      it('calls telemetry of andean drone', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'telemetry of andean drone'}))
        
        //assert on the response
        requestTelemetryFlight('qH006','04-01-2021 15:00:00', '04-01-2021 18:00:00').then(res => {
          expect(res.data).toEqual('telemetry of andean drone')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/telemetry_andean_drone?qhawax_name=qH006&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00')
      })

      it('calls last time of the start flight', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'time of the start flight'}))
        
        //assert on the response
        lastStartFlight('qH006').then(res => {
          expect(res.data).toEqual('time of the start flight')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/flight_log_info_by_qhawax_name/?name=qH006')
      })

      it('calls measurements by pollutant during flight', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'measurements by pollutant during flight'}))
        
        //assert on the response
        getInFlightSensor({'name':'qH006', 'sensor':'CO'}).then(res => {
          expect(res.data).toEqual('measurements by pollutant during flight')
        })
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/measurements_by_pollutant_during_flight/?name=qH006&pollutant=CO')
      })
      
  })

  test('handle error', () =>{
     global.M = require('../build/js/materialize.min.js');
    expect(handleError('error').statusText).toStrictEqual('OK');
  });