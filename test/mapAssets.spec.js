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
	expect(uvColor(14)).toStrictEqual({
		color: 'darkmagenta',
		label: 'Extremo',
	});
});

