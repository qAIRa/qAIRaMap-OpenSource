const generateGif = (inca) => {
		if (inca >= 0 && inca <= 50) {
			return '/img/qairito/qairito_buena.gif';
		} else if (inca <= 100) {
			return '/img/qairito/qairito_moderada.gif';
		} else if (inca <= 500) {
			return '/img/qairito/qairito_mala.gif';
		} else {
			return '/img/qairito/qairito_cuidado.gif';
		}
};

const infowindowComplete = (
	qhawax,
	zoneColor,
	values,
	qhawax_sensor_color,
	qhawax_inca,
	company,
	marker,
	colorUV
) => {
	return `
<div class="infoWindow">
	<h6 class="header">
		${qhawax.comercial_name}
		<br />
		<img
			src="${generateGif(qhawax.main_inca)}"
			alt="Hoja Calidad aire"
			class="qairito-img"
		/>
	</h6>
	<h7 class="header"><strong>${zoneColor.zone}</strong></h7>
	<br />
	<h7 class="header">${values.time}</h7>
	<div class="gas-table">
		<table class="responsive-table centered">
			<thead>
				<tr>
					<th>
						<br />
						(${qhawax.name})
						<br />
					</th>
					<th>
						${window.innerWidth > 768 ? 'Monóxido de Carbono ' : ''}(CO)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Dióxido de Nitrógeno ' : ''}(NO
						<sub>2</sub>
						)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Ozono ' : ''}(O<sub>3</sub>)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno ' : ''}(H<sub>2</sub>S)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Dióxido de Azúfre ' : ''}(SO<sub>2</sub>)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(2,5&micro;)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(10&micro;)
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<strong>INCA</strong>
						<br />
						(promedio<br />
						${qhawax_sensor_color.time})
					</td>
					<td bgcolor="${
						qhawax_inca.CO === 0 || qhawax_inca.CO
							? qhawax_sensor_color.result.CO.color
							: 'transparent'
					}">
						${
							qhawax_inca.CO === 0 || qhawax_inca.CO
								? qhawax_sensor_color.result.CO.label
								: ''
						}<br />
						(${qhawax_inca.CO === 0 || qhawax_inca.CO ? qhawax_inca.CO : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.NO2 === 0 || qhawax_inca.NO2
							? qhawax_sensor_color.result.NO2.color
							: 'transparent'
					}">
						${
							qhawax_inca.NO2 === 0 || qhawax_inca.NO2
								? qhawax_sensor_color.result.NO2.label
								: ''
						} <br />
						(${qhawax_inca.NO2 === 0 || qhawax_inca.NO2 ? qhawax_inca.NO2 : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.O3 === 0 || qhawax_inca.O3
							? qhawax_sensor_color.result.O3.color
							: 'transparent'
					}">
						${
							qhawax_inca.O3 === 0 || qhawax_inca.O3
								? qhawax_sensor_color.result.O3.label
								: ''
						}	<br />
						(${qhawax_inca.O3 === 0 || qhawax_inca.O3 ? qhawax_inca.O3 : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.H2S === 0 || qhawax_inca.H2S
							? qhawax_sensor_color.result.H2S.color
							: 'transparent'
					}">
						${
							qhawax_inca.H2S === 0 || qhawax_inca.H2S
								? qhawax_sensor_color.result.H2S.label
								: ''
						} <br />
						(${qhawax_inca.H2S === 0 || qhawax_inca.H2S ? qhawax_inca.H2S : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.SO2 === 0 || qhawax_inca.SO2
							? qhawax_sensor_color.result.SO2.color
							: 'transparent'
					}">
						${
							qhawax_inca.SO2 === 0 || qhawax_inca.SO2
								? qhawax_sensor_color.result.SO2.label
								: ''
						} <br />
						(${qhawax_inca.SO2 === 0 || qhawax_inca.SO2 ? qhawax_inca.SO2 : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.PM25 === 0 || qhawax_inca.PM25
							? qhawax_sensor_color.result.PM25.color
							: 'transparent'
					}">
						${
							qhawax_inca.PM25 === 0 || qhawax_inca.PM25
								? qhawax_sensor_color.result.PM25.label
								: ''
						} <br />
						(${qhawax_inca.PM25 === 0 || qhawax_inca.PM25 ? qhawax_inca.PM25 : '-'})
					</td>
					<td bgcolor="${
						qhawax_inca.PM10 === 0 || qhawax_inca.PM10
							? qhawax_sensor_color.result.PM10.color
							: 'transparent'
					}">
						${
							qhawax_inca.PM10 === 0 || qhawax_inca.PM10
								? qhawax_sensor_color.result.PM10.label
								: ''
						} <br />
						(${qhawax_inca.PM10 === 0 || qhawax_inca.PM10 ? qhawax_inca.PM10 : '-'})
					</td>
				</tr>
				<tr>
					<td>
						Concentración
						<br />
						Tiempo Real
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="CO"
						>
							${values.CO}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="NO2"
						>
							${values.NO2}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="O3"
						>
							${values.O3}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="H2S"
						>
							${values.H2S}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="SO2"
						>
							${values.SO2}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="PM25"
						>
							${values.PM25}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="PM10"
						>
							${values.PM10}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="">
		<table class="responsive-table centered">
			<thead>
				<tr>
					<th></th>
					<th>
						${window.innerWidth > 768 ? 'Ruido ' : 'Ruido '}(dB)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Temperatura ' : 'T '}(°C)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Ultra Violeta ' : 'UV '}
					</th>
					<th>
						${window.innerWidth > 768 ? 'Presión ' : 'P '}(kPa)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Humedad ' : 'H '} (%)
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<strong>
							Tiempo
							<br />
							Real
						</strong>
					</td>
					<td bgcolor="${zoneColor.color}">${values.spl}</td>
					<td>${values.temperature}</td>
					<td bgcolor="${colorUV.color}">
						${colorUV.label}
						<br />
						${values.UV}
					</td>
					<td>${values.pressure}</td>
					<td>${values.humidity}</td>
				</tr>
			</tbody>
		</table>
		<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
	</div>
</div>
`;
};

const infowindowPartial = (
	qhawax,
	zoneColor,
	values,
	company,
	marker,
	colorUV
) => {
	return `
    <div class="infoWindow">
	<h6 class="header">
		${qhawax.comercial_name}
		<br />
		<img
			src="${generateGif(qhawax.main_inca)}"
			alt="Hoja Calidad aire"
			class="qairito-img"
		/>
	</h6>
	<h7 class="header"><strong>${zoneColor.zone}</strong></h7>
	<br />
	<h7 class="header">${values.time}</h7>
	<div class="gas-table">
		<table class="responsive-table centered">
			<thead>
				<tr>
					<th>
						<br />
						(${qhawax.name})
						<br />
					</th>
					<th>
						${window.innerWidth > 768 ? 'Monóxido de Carbono ' : ''}(CO)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Dióxido de Nitrógeno ' : ''}(NO
						<sub>2</sub>
						)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Ozono ' : ''}(O
						<sub>3</sub>
						)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno ' : ''}(H
						<sub>2</sub>
						S)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Dióxido de Azúfre ' : ''}(SO
						<sub>2</sub>
						)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(2,5&micro;)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}(10&micro;)
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<strong>INCA</strong>
						<br />
						(a la espera de data promedio)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
					<td>
						<br />
						(...)
					</td>
				</tr>
				<tr>
					<td>
						Concentración
						<br />
						Tiempo Real
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="CO"
						>
							${values.CO}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="NO2"
						>
							${values.NO2}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="O3"
						>
							${values.O3}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="H2S"
						>
							${values.H2S}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="SO2"
						>
							${values.SO2}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="PM25"
						>
							${values.PM25}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
					<td class="infowindow-graph">
						<a
							class="modal-trigger"
							href="#modalGraphic"
							data-infograph="${marker.id}"
							data-label="PM10"
						>
							${values.PM10}
							<br />
							(&micro;g/m
							<sup>3</sup>
							)
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="">
		<table class="responsive-table centered">
			<thead>
				<tr>
					<th></th>
					<th>
						${window.innerWidth > 768 ? 'Ruido ' : 'Ruido '}(dB)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Temperatura ' : 'T '}(°C)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Ultra Violeta ' : 'UV '}
					</th>
					<th>
						${window.innerWidth > 768 ? 'Presión ' : 'P '}(kPa)
					</th>
					<th>
						${window.innerWidth > 768 ? 'Humedad ' : 'H '} (%)
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<strong>
							Tiempo
							<br />
							Real
						</strong>
					</td>
					<td bgcolor="${zoneColor.color}">${values.spl}</td>
					<td>${values.temperature}</td>
					<td bgcolor="${colorUV.color}">
						${colorUV.label}
						<br />
						${values.UV}
					</td>
					<td>${values.pressure}</td>
					<td>${values.humidity}</td>
				</tr>
			</tbody>
		</table>
		<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
	</div>
</div>

    `;
};

export { infowindowComplete, infowindowPartial, generateGif };
