const configuration = {
	toImageButtonOptions: {
		format: 'png', // one of png, svg, jpeg, webp
		filename: 'custom_image',
		height: 500,
		width: 700,
		scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
	},
	modeBarButtonsToRemove: [
		'sendDataToCloud',
		'editInChartStudio',
		'zoom2d',
		'pan2d',
		'select2d',
		'lasso2d',
		'zoomIn2d',
		'zoomOut2d',
		'autoScale2d',
		'resetScale2d',
		'hoverClosestCartesian',
		'toggleSpikelines',
		'hoverCompareCartesian',
	],
	displaylogo: false,
	responsive: true,
};
export {configuration}