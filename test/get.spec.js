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

it('Installation date', async () => {
    fetchMock.mockOnce("No Installation Date")
    const data = await requestInstallationDate(4);
    expect.assertions(1);
    expect(data).toEqual('No Installation Date');
  });
//   it('Installation date2', async () => {
//     fetchMock.mockOnce("2022-08-27 17:00:34+00:00")
//     const data = await requestInstallationDate(4);
//     expect.assertions(1);
//     expect(data).toEqual('2022-08-27 17:00:34+00:00');
//   });