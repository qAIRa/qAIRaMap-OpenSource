const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const formatDateDB = timestamp => addZero(new Date(Date.parse(timestamp)).getHours()) + 'h';

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

export {
    addZero,
    formatDateDB,
    optionsDatePicker,
    optionsTimePicker,
    elementMeteo,
    elementRT,
    incaResult,
    uvColors,
    noiseLimits,
    qualityColor
};