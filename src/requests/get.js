import {APISource} from '../index.js';

const requestAllQhawax = async company => {
    const response = await fetch(`${APISource}AllQhawaxInMap/`);
    return  await response.json();
}

const requestAverageMeasurement = async (qhawax, sensor) => {
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/gas_average_measurement/?qhawax=${qhawax_id}&gas=${sensor}`);
    return  await response.json();
}


const requestBinnacle = async (ID) => {
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/get_all_observations_by_qhawax/?qhawax_id=${ID}`);
    return await response.json();
};

const requestStatus = async (ID) =>{
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/qhawax_status/?name=${ID}`);
    return await response.text()
};
const downloadData = async(check, selectedParameters,init, end) =>{
	const URL = check
				? `${APISource}valid_processed_measurements_period/?qhawax_id=${selectedParameters.id}&initial_timestamp=${init}&final_timestamp=${end}`
				: `${APISource}average_valid_processed_period/?qhawax_id=${selectedParameters.id}&initial_timestamp=${init}&final_timestamp=${end}`;

    const response = await fetch(URL);
    return await response.json();
};
const requestInstallationDate = async (ID)=>{
    const response = await fetch(`${APISource}GetInstallationDate/?qhawax_id=${ID}`);
    return await response.text()
};
export { 
    requestAverageMeasurement,
    requestAllQhawax,
    requestBinnacle,
    requestStatus,
    downloadData,
    requestInstallationDate
}