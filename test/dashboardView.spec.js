import {viewDashboard, ppbToECAdash, indexValue, request } from '../src/views/dashboardView.js';

const data = {
    CO: 1,
    CO_ug_m3: 1.15,
    H2S: 3,
    H2S_ug_m3: 4.17,
    ID: "qH004",
    NO2: 240,
    NO2_ug_m3: 451.2,
    O3: 5,
    O3_ug_m3: 9.8,
    PM1: 1.9,
    PM10: 2.398,
    PM25: 1.652,
    SO2: 2,
    SO2_ug_m3: 5.24,
    UV: 0,
    UVA: 0,
    UVB: 0,
    humidity: 71.6,
    lat: -12.072736,
    lon: -77.082687,
    pressure: 100680.49,
    spl: 84.3,
    temperature: 19.1,
    timestamp: "2020-09-01 15:27:42.0-04:00",
    timestamp_zone: "2020-09-01 15:27:42.0-04:00",
    zone: "Zona de Protección Especial"
}

const element = `<div class="dashboard">   
<table class="responsive-table highlight centered table-calibration">
            <thead>
              <tr>
                <th align="justify">Qhawax</th> 
                <th align="justify">Name</th>  
                <th align="justify">Time</th>
                <th align="justify">SO<sub>2</sub><br>(µg/m<sup>3</sup>)</th>
                <th align="justify">NO<sub>2</sub><br>(µg/m<sup>3</sup>)</th>
                <th align="justify">CO<br>(µg/m<sup>3</sup>)</th>
                <th align="justify">H<sub>2</sub>S<br>(µg/m<sup>3</sup>)</th>
                <th align="justify">O<sub>3</sub><br>(µg/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>2,5</sub><br>(µg/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>10</sub><br>(µg/m<sup>3</sup>)</th>
                <th align="justify">UV</th>    
                <th align="justify">dB</th>
                <th align="justify">°C</th>
                <th align="justify">H (%)</th>
                <th align="justify">P<br>(kPa)</th>
                <th align="justify">Conection</th>
              </tr>
            </thead>
            <tbody>
            <tr data-name="qH004">
			   <td><strong>qH004</strong></td>
			   <td>Test Aguitas 2.0</td>
			   <td>15:21:26</td>
			   <td style="color:black">5.2</td> 
			   <td style="color:red">451.4</td> 
			   <td style="color:black">1.1</td> 
			   <td style="color:black">4.2</td>
			   <td style="color:black">9.8</td>  
			   <td style="color:black">4</td> 
			   <td style="color:black">5</td> 
			   <td style="color:red">0</td> 
			   <td>71.2</td>
			   <td>19.3</td>
			   <td>71.3</td>
			   <td>100.7</td>  
			   <td><i class="material-icons" style="color:#32CD32">wifi</i></td>
			   </tr></tbody>
            <tfoot>
        <tr>
            <th scope="row" align="center" colspan="16" id="wrapper-pagination">
            </th>
        </tr>
    </tfoot>
          </table>
</div>`


test('from ppb to ECA standards', () => {
    expect(ppbToECAdash('CO')).toEqual({ ECA: 10000 * 0.87, factor: 1.144919906 });
    expect(ppbToECAdash('NO2')).toEqual({ ECA: 100 * 0.532, factor: 1.880677075 });
    expect(ppbToECAdash('O3')).toEqual({ ECA: 100 * 0.51, factor: 1.962019118 });
    expect(ppbToECAdash('H2S')).toEqual({ ECA: 150 * 0.719, factor: 1.393033574 });
    expect(ppbToECAdash('SO2')).toEqual({ ECA: 250 * 0.382, factor: 2.618478014 });
    expect(ppbToECAdash('PM25')).toEqual({ ECA: 50, factor: 1 });
    expect(ppbToECAdash('PM10')).toEqual({ ECA: 100, factor: 1 });
    });

// test('index values for dashboard data', () => {
//     expect(indexValue(data)).toEqual({"CO": 1.1, "COcolor": "black", "H2S": 4.2, "H2Scolor": "black", "NO2": 451.4, "NO2color": "red", "O3": 9.8, "O3color": "black", "PM1": 1.9, "PM10": 2.4, "PM10color": "black", "PM1color": "black", "PM25": 1.7, "PM25color": "black", "SO2": 5.2, "SO2color": "black", "UV": 0, "UVcolor": "red", "humidity": "71.6", "id": "qH004", "lat": "-12.07274", "lng": "-77.08269", "pressure": "100.7", "spl": 84.3, "temperature": "19.1", "time": "14:27:42"});
//     });

// test('dashboard view', () => {
//     window.M = jest.fn();
//     M.Dropdown= jest.fn();
//     M.Dropdown.init= jest.fn();
//     M.Sidenav= jest.fn();
//     M.Sidenav.init= jest.fn();
//     M.Modal=jest.fn();
//     M.Modal.init=jest.fn();
//     document.body.innerHTML = `
//     <header></header>
//       <div id="content-page">
//       </div>
//     `;
//     expect(String(viewDashboard())).toMatch('[object HTMLDivElement]');
//     });

// test('request for dashboard', () => {
//     document.body.innerHTML = `
//     <table><thead></thead><tbody></tbody><tfoot></tfoot></table>
//     `;
//     let qhawax_asigned=[]
//     expect(request(element,qhawax_asigned)).toEqual({});
//     // expect(request(element,qhawax_asigned).resolve('lemon')).resolves.toBe('lemon')

//     });
