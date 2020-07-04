const options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};

const json2csv = (jsonData, jsonFields) => {
	let csvStr = jsonFields.join(',') + '\n';

	for (let i = 0; i < jsonData.length; i++) {
		jsonData[i].timestamp = new Intl.DateTimeFormat(
			'es-PE',
			options
		).format(new Date(Date.parse(jsonData[i].timestamp) + 5 * 3600 * 1000));
		csvStr +=
			Object.getOwnPropertyNames(jsonData[i])
				.map(e => jsonData[i][e])
				.join(',') + '\n';
	}
	return csvStr;
};

const download = (content, fileName, mimeType) => {
	const a = document.createElement('a');
	mimeType = mimeType || 'application/octet-stream';

	if (navigator.msSaveBlob) {
		// IE10
		navigator.msSaveBlob(
			new Blob([content], {
				type: mimeType,
			}),
			fileName
		);
	} else if (URL && 'download' in a) {
		//html5 A[download]
		a.href = URL.createObjectURL(
			new Blob([content], {
				type: mimeType,
			})
		);
		a.setAttribute('download', fileName);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	} else {
		location.href =
			'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
	}
};

export { json2csv, download };
