import { 
    requestAverageMeasurement,
    requestAllQhawax,
    requestBinnacle,
    requestStatus,
    downloadData,
    requestInstallationDate
} from '../src/requests/get.js';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()

beforeEach(() => { 
  fetchMock.doMock()
})

  describe('testing api', () => {
    beforeEach(() => {
      fetch.resetMocks()
    })
   
    it('calls installation date', () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
   
      //assert on the response
      requestInstallationDate(4).then(res => {
        expect(res.data).toEqual('12345')
      })
   
      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/GetInstallationDate/?qhawax_id=4')
    })

    it('calls all qHAWAXs', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
     
        //assert on the response
        requestAllQhawax().then(res => {
          expect(res.data).toEqual('12345')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/AllQhawaxInMap/')
      });

      it('calls binnacle', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345'}))
     
        //assert on the response
        requestBinnacle(4).then(res => {
          expect(res.data).toEqual('12345')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/get_all_observations_by_qhawax/?qhawax_id=4')
      });
      it('calls status', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345'}))
     
        //assert on the response
        requestStatus(4).then(res => {
          expect(res.data).toEqual('12345')
        })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/qhawax_status/?name=4')
      })
      it('calls download data', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345'}))
        //assert on the response
        downloadData(true, 4,'01-09-2020 05:00:00', '01-09-2020 18:00:00').then(res => {
          expect(res.data).toEqual('12345')
        })
        downloadData(false, 4,'01-09-2020 05:00:00', '01-09-2020 18:00:00').then(res => {
            expect(res.data).toEqual('12345')
          })
     
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(2)
        expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/valid_processed_measurements_period/?qhawax_id=4&initial_timestamp=01-09-2020 05:00:00&final_timestamp=01-09-2020 18:00:00')
        expect(fetch.mock.calls[1][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/average_valid_processed_period/?qhawax_id=4&initial_timestamp=01-09-2020 05:00:00&final_timestamp=01-09-2020 18:00:00')
      });
      it('calls average measurements', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345'}))
        //assert on the response
        requestAverageMeasurement(4,'CO').then(res => {
          expect(res.data).toEqual('12345')
        })
     
        //assert on the times called and arguments given to fetch
        
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('https://qairamapnapi-dev-opensource.qairadrones.com/api/gas_average_measurement/?qhawax=4&gas=CO')
      })

  })
