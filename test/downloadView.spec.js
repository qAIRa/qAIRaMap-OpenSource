import { 
  downloadView, 
  reorderDate, 
  withLocalTime, 
  requestQhawaxs, 
  requestDownload, 
  installationDateReq,
  initialToast,
  finalToast
} from '../src/views/downloadView.js';
import {  downloadData} from '../src/requests/get.js';
import { enableFetchMocks } from 'jest-fetch-mock';


  enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
 
  })
  

const html = '[object HTMLDivElement]';

test('download page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    require('../build/js/materialize.min.js')
	expect(downloadView().toString()).toMatch(html);
})

const str1 = '09-26-2020';
const resultdate = '2020-26-09';
test('reorder Date', () =>{
	expect(reorderDate(str1)).toStrictEqual(resultdate);
});

const str2 = '09-26-2020 12:00:00';
const resulttime = '26-09-2020 12:00:00';
test('local time', () =>{
	expect(withLocalTime(str2)).toStrictEqual(resulttime);
});

test('initialToast', () =>{
	expect(initialToast()).toStrictEqual('init');
});

test('finalToast', () =>{
	expect(finalToast()).toStrictEqual('final');
});

const resp = {
  CO_ug_m3: null,
  H2S_ug_m3: 613.723,
  NO2_ug_m3: null,
  O3_ug_m3: null,
  PM10: 0,
  PM25: 0,
  SO2_ug_m3: null,
  SPL: 81.757,
  UV: 0,
  humidity: 72.656,
  lat: -12.072736,
  lon: -77.0826870000001,
  pressure: 1005.406,
  temperature: 24.367,
  timestamp_zone: "Mon, 04 Jan 2021 15:00:00 GMT"
}
// fetch.mockResponseOnce(JSON.stringify({ data: 'calls download data'}))
// fetch.mockResponseOnce('downloadData', ('qH004','04-01-2021 15:00:00', '04-01-2021 18:00:00') => {
//   return {
//       baseURL: 'https://openqairamapnapi.qairadrones.com/api/average_valid_processed_period/?qhawax_id=qH004&initial_timestamp=04-01-2021 15:00:00&final_timestamp=04-01-2021 18:00:00',
//       request: jest.fn().mockResolvedValue({
//           data: [
//             {
//               CO_ug_m3: null,
//               H2S_ug_m3: 613.723,
//               NO2_ug_m3: null,
//               O3_ug_m3: null,
//               PM10: 0,
//               PM25: 0,
//               SO2_ug_m3: null,
//               SPL: 81.757,
//               UV: 0,
//               humidity: 72.656,
//               lat: -12.072736,
//               lon: -77.0826870000001,
//               pressure: 1005.406,
//               temperature: 24.367,
//               timestamp_zone: "Mon, 04 Jan 2021 15:00:00 GMT"
//             }
//           ]
//       }),
//   }
// });

// test('requestDownload', () =>{
//    fetch.mockResponseOnce(JSON.stringify({ data: 'calls download data'}))
//   window.TextEncoder = jest.fn()
//   TextEncoder.prototype.encode = jest.fn()
//   window.streamSaver = jest.fn()
//   streamSaver.prototype.createWriteStream = jest.fn()
//   // require('/home/sabrina/Documents/qAIRa/qAIRaMap-OpenSource/node_modules/streamsaver/StreamSaver.js')
//   // fetch.mockResponse(() => downloadData('04-01-2021 13:49:00', '04-01-2021 15:49:00').then(res => (resp)))
//   expect.assertions(0);
//   expect(fetch.mock.calls[0][0]).toEqual('')
//   return requestDownload('04-01-2021 13:49:00', '04-01-2021 15:49:00').then(data => expect(data).toEqual( ''));

// });