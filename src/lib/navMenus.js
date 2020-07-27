


const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const ppbToECAdash = sensor => {
	switch (sensor) {
		case 'CO':
			return { ECA: 10000 * 0.87, factor: 1.144919906 };
		case 'NO2':
			return { ECA: 100 * 0.532, factor: 1.880677075 };
		case 'O3':
			return { ECA: 100 * 0.51, factor: 1.962019118 };
		case 'H2S':
			return { ECA: 150 * 0.719, factor: 1.393033574 };
		case 'SO2':
			return { ECA: 250 * 0.382, factor: 2.618478014 };
		case 'PM25':
			return { ECA: 50, factor: 1 };
		case 'PM10':
			return { ECA: 100, factor: 1 };
		default:
			break;
	}
};

export {

addZero,
ppbToECAdash,

};