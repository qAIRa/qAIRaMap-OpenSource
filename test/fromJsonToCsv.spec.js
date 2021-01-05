import { json2csv, download } from '../src/lib/fromJsonToCsv.js';

const jsonFields = ["CO (ug/m3)", "H2S (ug/m3)", "NO2 (ug/m3)", "O3 (ug/m3)", "PM10 (ug/m3)", "PM2.5 (ug/m3)", "SO2 (ug/m3)", "Ruido (dB)", "UV", "Humedad (%)", "Latitud", "Longitud", "Presion (Pa)", "Temperatura (C)", "Fecha"]
const csv='CO (ug/m3),H2S (ug/m3),NO2 (ug/m3),O3 (ug/m3),PM10 (ug/m3),PM2.5 (ug/m3),SO2 (ug/m3),Ruido (dB),UV,Humedad (%),Latitud,Longitud,Presion (Pa),Temperatura (C),Fecha'
const jsonData='';

test('from json to csv', () => {
	expect(json2csv(jsonData, jsonFields)).toEqual(
		expect.stringContaining(csv)
    );
    });
test('download', () => {
    window.URL.createObjectURL = jest.fn();
    window.navigator.msSaveOrOpenBlob = null;
    window.TextEncoder = jest.fn()
    window.Response = jest.fn()
   TextEncoder.prototype.encode = jest.fn()
   Response.prototype.body = jest.fn()
   Response.prototype.body.pipeTo = jest.fn()
    window.streamSaver = jest.fn()
    streamSaver.createWriteStream = jest.fn()
  afterEach(() => {
    window.URL.createObjectURL.mockReset();
  });
  require('../node_modules/streamsaver/StreamSaver.js')
	download(csv, `filename.csv`, 'text/csv;encoding:utf-8')
    expect(window.navigator.msSaveOrOpenBlob).toBe(null);
    });