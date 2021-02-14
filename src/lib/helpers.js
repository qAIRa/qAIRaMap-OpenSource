import { intervalToDuration} from 'date-fns';
const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};


const optionsDatePicker = {
    format: 'mm-dd-yyyy',
};

const optionsTimePicker = {
	twelveHour: false,
	vibrate: false,
};

const elementMeteo = {
	spl:'__',
	temperature:'__',
	pressure:'__',
	humidity:'__',
	UV:'__'
}


const elementRT = {
	CO_ug_m3:'__',
    NO2_ug_m3:'__',
    O3_ug_m3:'__',
    H2S_ug_m3:'__',
	SO2_ug_m3:'__',
	PM25:'__',
	PM10:'__'
}

let incaResult = {
	CO:null,
	H2S:null,
	NO2:null,
	O3:null,
	PM10:null,
	PM25:null,
	SO2:null,
}

const uvColors = {
	Null:{color:'transparent',label:''},
	Minimum: { color: '#009966', label: 'Minimum' },
	Low: { color: '#ffde33', label: 'Low' },
	Moderate: { color: '#ff9933', label: 'Moderate' },
	High: { color: '#cc0033', label: 'High' },
	Extreme: { color: 'darkmagenta', label: 'Extreme' },
  
  };

  const noiseLimits = {
	'Zona de Protección Especial':{day:50, night:40},
	'Zona Residencial':{day:60, night:50},
	'Zona Comercial':{day:70, night:60},
	'Zona Industrial':{day:80, night:70},
}

const qualityColor ={
	good:{color: '#009966',label: 'Good' },
	moderate:{color: '#ffde33',label: 'Moderate'},
	bad:{color: '#ff9933',label: 'Bad'},
	hazardous:{color: '#cc0033',label: 'Danger' },
	noinfo:{color: 'transparent',label: '' }
}

let sensors = {
	PM10:null, SO2:null, CO:null, H2S:null, PM25:null, O3:null, NO2:null
}
const limits = {
	PM10:[0,50,100,167],
	SO2:[0,50,100,625],
	CO:[0,50,100,150],
	H2S:[0,50,100,1000],
	PM25:[0,50,100,500],
	O3:[0,50,100,175],
	NO2:[0,50,100,150]
}

const msToMin = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}
const notNull = (value) => value===null ||value < 0 ? '__': value;
const formatDate = str=>str.slice(0,10).split('-').reverse().join(',')+','+str.slice(11,19).split(':').join(',');
const arrD = date =>formatDate(date).split(',').map(Number)
const newDate =date => new Date(arrD(date)[0],arrD(date)[1],arrD(date)[2], arrD(date)[3], arrD(date)[4],arrD(date)[5])

const toast = (html, classes)=> M.toast({html: html, classes: classes, displayLength: 5000})
const duration = (flight)=>{
	const time = intervalToDuration({start:new Date(flight.flight_start), end:new Date(flight.flight_end)})
	const h = time.hours!==0?addZero(time.hours)+':':'00:';
	const m =time.minutes!==0?addZero(time.minutes)+':':'00:';
	const s= time.seconds!==0?addZero(time.minutes)+':':'00';
	return h+m+s;
}
export {
    addZero,
    optionsDatePicker,
    optionsTimePicker,
    elementMeteo,
    elementRT,
    incaResult,
    uvColors,
    noiseLimits,
	qualityColor,
	sensors,
	limits,
	toast,
	duration, 
	notNull
};