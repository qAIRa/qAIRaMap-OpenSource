import { 
    requestAverageMeasurement,
    requestAllQhawax,
    requestBinnacle,
    requestStatus,
    downloadData,
    requestInstallationDate,
    handleError,
    requestGraphicsData
} from '../src/requests/get.js';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
 
  })


  describe('testing fetch calls', () => {
    
    
    it('calls installation date', () => {
      fetch.mockResponseOnce('calls installation date')
     
      //assert on the response
      requestInstallationDate('qH004').then(res => {
        expect(res).toEqual('calls installation date')
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/GetInstallationDate/?qhawax_id=qH004')
    })

    it('calls all qHAWAXs', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls all qHAWAXs' }))
        
        //assert on the response
        requestAllQhawax().then(res => {
          expect(res.data).toEqual('calls all qHAWAXs')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/AllQhawaxInMap/')
      });

      it('calls binnacle', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: 'calls binnacle'}))
        
        //assert on the response
        requestBinnacle(4).then(res => {
          expect(res.data).toEqual('calls binnacle')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/get_all_observations_by_qhawax/?qhawax_id=4')
      });
      it('calls status', () => {
        fetch.mockResponseOnce('calls status');
     
        //assert on the response
        requestStatus(4).then(res => {
          expect(res).toEqual('calls status')
        })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://openqairamapnapi.qairadrones.com/api/qhawax_status/?name=4')
      })
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

  })

  test('handle error', () =>{
    global.M = require('../build/js/materialize.min.js');
    expect(handleError('error').statusText).toStrictEqual('OK');
  });