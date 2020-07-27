import {
	drawQhawaxMap,
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


test('qhawaxLeaf for each state of the qhawax', () => {
	expect(qhawaxLeaf(-1)).toStrictEqual(
		'/img/leafs/leaf_out_of_service.png'
	);
	expect(qhawaxLeaf(0)).toStrictEqual(
		'/img/leafs/leaf_helmet.png'
	);
	expect(qhawaxLeaf(1)).toStrictEqual(
		'/img/leafs/leaf_helmet.png'
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

