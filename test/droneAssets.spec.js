import {
    CallOnceToast,
    limitColor,
    circleColor,
    addLine,
    removeLine,
    createOption,
    newCircle,
    callSocketSensors,
    drawCirclesPollutant,
    activateDrawBtn,
    selectDroneFlight,
    landing,
    newPolyline,
    callSocketFlight,
    takeoff,
    newMarkerDrone,
    requestDrones
} from '../src/lib/droneAssets.js';

test('call toast only once', () => {
    global.M = require('../build/js/materialize.min.js');
  expect(CallOnceToast(false,-1)).toStrictEqual(false);
  expect(CallOnceToast(true,1)).toStrictEqual(true);
  })

test('limits for the pollutants', () => {
  expect(limitColor(-1,50,100,150)).toStrictEqual("#FFFFFF");
  expect(limitColor(49,50,100,150)).toStrictEqual("#009966");
  expect(limitColor(99,50,100,150)).toStrictEqual("#ffde33");
  expect(limitColor(149,50,100,150)).toStrictEqual("#ff9933");
  expect(limitColor(151,50,100,150)).toStrictEqual("#cc0033");
  })

test('color of the circle', () => {
  expect(circleColor({sensor:'CO'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'O3'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'SO2'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'H2S'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'NO2'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'PM10'})).toStrictEqual("#FFFFFF");
  expect(circleColor({sensor:'PM25'})).toStrictEqual("#FFFFFF");
  })