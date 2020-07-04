import {
	drawQhawaxMap,
	mapCenter,
	drawChart,
	airQuality,
	qhawaxLeaf,
	zoneColorNoise,
	indexValue,
	setQhawaxInfowindow,
	uvColor,
} from '../src/lib/mapAssets';

const data = {
	CO: 8,
	H2S: 15,
	NO2: 0,
	O3: 61,
	PM10: 4,
	PM25: 9,
	SO2: 0,
	main_inca: 100,
	qhawax_id: 12,
	qhawax_name: 'qH012',
	timestamp: 'Thu, 23 Apr 2020 11:00:00 GMT',
};

test('mapCenter for each company', () => {
	expect(mapCenter(0)).toStrictEqual({
		lat: -12.04318,
		lng: -77.02824,
	});
	expect(mapCenter(1)).toStrictEqual({
		lat: -12.04318,
		lng: -77.02824,
	});
	expect(mapCenter(3)).toStrictEqual({
		lat: -12.04388888,
		lng: -77.05055555,
	});
	expect(mapCenter(4)).toStrictEqual({
		lat: -12.09678,
		lng: -76.98924,
	});
	expect(mapCenter(8)).toStrictEqual({
		lat: -12.1097222222,
		lng: -77.05194444444,
	});
	expect(mapCenter(9)).toStrictEqual({
		lat: -12.0598871,
		lng: -77.0906558,
	});
});

test('qhawaxLeaf for each state of the qhawax', () => {
	expect(qhawaxLeaf(-1)).toStrictEqual(
		'/img/leafs/leaf_out_of_service.png'
	);
	expect(qhawaxLeaf(0)).toStrictEqual(
		'/img/leafs/leaf_inca_limbo.gif'
	);
	expect(qhawaxLeaf(1)).toStrictEqual(
		'/img/leafs/leaf_inca_limbo.gif'
	);
	expect(qhawaxLeaf(50)).toStrictEqual(
		'/img/leafs/leaf_inca_good.png'
	);
	expect(qhawaxLeaf(100)).toStrictEqual(
		'/img/leafs/leaf_inca_moderate.png'
	);
	expect(qhawaxLeaf(500)).toStrictEqual(
		'/img/leafs/leaf_inca_bad.png'
	);
	expect(qhawaxLeaf(600)).toStrictEqual(
		'/img/leafs/leaf_inca_hazardous.png'
	);
	expect(qhawaxLeaf()).toStrictEqual(false);
});

test('uvColor', () => {
	expect(uvColor(0)).toStrictEqual({
		color: 'green',
		label: 'Mínimo',
	});
	expect(uvColor(3)).toStrictEqual({
		color: 'yellow',
		label: 'Bajo',
	});
	expect(uvColor(6)).toStrictEqual({
		color: 'orange',
		label: 'Moderado',
	});
	expect(uvColor(9)).toStrictEqual({
		color: 'red',
		label: 'Alto',
	});
	// expect(uvColor(12)).toStrictEqual({
	// 	color: 'mediumpurple',
	// 	label: 'Muy Alto',
	// });
	expect(uvColor(14)).toStrictEqual({
		color: 'darkmagenta',
		label: 'Extremo',
	});
});

// const airQuality = data => {
// 	const PM10 = data.PM10;
// 	const SO2 = data.SO2;
// 	const CO = data.CO;
// 	const H2S = data.H2S;
// 	const PM25 = data.PM25;
// 	const O3 = data.O3;
// 	const NO2 = data.NO2;
// 	const UV = data.UV;

// 	const newDate = new Date(data.timestamp);

// 	const time =
// 		addZero(newDate.getHours() + 5) + ':' + addZero(newDate.getMinutes());

// 	const qPM10 =
// 		PM10 >= 0 && PM10 <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: PM10 > 50 && PM10 <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: PM10 > 100 && PM10 <= 167
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: PM10 > 167
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qSO2 =
// 		SO2 >= 0 && SO2 <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: SO2 > 50 && SO2 <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: SO2 > 100 && SO2 <= 625
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: SO2 > 625
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qCO =
// 		CO >= 0 && CO <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: CO > 50 && CO <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: CO > 100 && CO <= 150
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: CO > 150
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qH2S =
// 		H2S >= 0 && H2S <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: H2S > 50 && H2S <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: H2S > 100 && H2S <= 1000
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: H2S > 1000
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qPM25 =
// 		PM25 >= 0 && PM25 <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: PM25 > 50 && PM25 <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: PM25 > 100 && PM25 <= 500
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: PM25 > 500
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qO3 =
// 		O3 >= 0 && O3 <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: O3 > 50 && O3 <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: O3 > 100 && O3 <= 175
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: O3 > 175
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qNO2 =
// 		NO2 >= 0 && NO2 <= 50
// 			? {
// 					color: 'green',
// 					label: 'Buena',
// 			  }
// 			: NO2 > 50 && NO2 <= 100
// 			? {
// 					color: 'yellow',
// 					label: 'Moderada',
// 			  }
// 			: NO2 > 100 && NO2 <= 150
// 			? {
// 					color: 'orange',
// 					label: 'Mala',
// 			  }
// 			: NO2 > 150
// 			? {
// 					color: 'red',
// 					label: 'Cuidado',
// 			  }
// 			: {
// 					color: 'transparent',
// 					label: '',
// 			  };

// 	const qUV =
// 		0 <= UV && UV < 3
// 			? 'green'
// 			: 3 <= UV && UV < 6
// 			? 'yellow'
// 			: 6 <= UV && UV < 9
// 			? 'orange'
// 			: 9 <= UV && UV < 12
// 			? 'red'
// 			: 12 <= UV && UV <= 14
// 			? 'orchid'
// 			: UV > 14
// 			? 'blueviolet'
// 			: 'transparent';

// 	const airColor =
// 		qPM10 === 'red' ||
// 		qSO2 === 'red' ||
// 		qCO === 'red' ||
// 		qH2S === 'red' ||
// 		qPM25 === 'red' ||
// 		qO3 === 'red' ||
// 		qNO2 === 'red'
// 			? 'red'
// 			: qPM10 === 'orange' ||
// 			  qSO2 === 'orange' ||
// 			  qCO === 'orange' ||
// 			  qH2S === 'orange' ||
// 			  qPM25 === 'orange' ||
// 			  qO3 === 'orange' ||
// 			  qNO2 === 'orange'
// 			? 'orange'
// 			: qPM10 === 'yellow' ||
// 			  qSO2 === 'yellow' ||
// 			  qCO === 'yellow' ||
// 			  qH2S === 'yellow' ||
// 			  qPM25 === 'yellow' ||
// 			  qO3 === 'yellow' ||
// 			  qNO2 === 'yellow'
// 			? 'yellow'
// 			: qPM10 === 'green' ||
// 			  qSO2 === 'green' ||
// 			  qCO === 'green' ||
// 			  qH2S === 'green' ||
// 			  qPM25 === 'green' ||
// 			  qO3 === 'green' ||
// 			  qNO2 === 'green'
// 			? 'green'
// 			: 'transparent';

// 	return {
// 		time,
// 		qPM10,
// 		qSO2,
// 		qCO,
// 		qH2S,
// 		qPM25,
// 		qO3,
// 		qNO2,
// 		qUV,
// 		airColor,
// 	};
// };
