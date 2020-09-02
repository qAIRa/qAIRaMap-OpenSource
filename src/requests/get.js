import {APISource} from '../index.js';
const handleError =  (err)=> {
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error xD'
    }));
};

const requestAllQhawax = async() => {
    const response = await fetch(`${APISource}AllQhawaxInMap/`).catch(err => handleError(err));
    return  await response.json();
}

const requestAverageMeasurement = async (qhawax, sensor) => {
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/gas_average_measurement/?qhawax=${qhawax}&gas=${sensor}`).catch(err => handleError(err));
    return  await response.json();
}


const requestBinnacle = async (ID) => {
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/get_all_observations_by_qhawax/?qhawax_id=${ID}`).catch(err => handleError(err));
    return await response.json();
};

const requestStatus = async (ID) =>{
    const response = await fetch(`https://qairamapnapi-dev-opensource.qairadrones.com/api/qhawax_status/?name=${ID}`).catch(err => console.log(err));
    return await response.text()
};
const downloadData = async(check, id,init, end) =>{
	const URL = check
				? `${APISource}valid_processed_measurements_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`
				: `${APISource}average_valid_processed_period/?qhawax_id=${id}&initial_timestamp=${init}&final_timestamp=${end}`;

    const response = await fetch(URL).catch(err => handleError(err));
    return await response.json();
};
const requestInstallationDate = async (ID)=>{
    const response = await fetch(`${APISource}GetInstallationDate/?qhawax_id=${ID}`).catch(err => console.log(err));
    return await response.text()
};

const requestGraphicsData = async (qhawax, time)=>{
    const response = await fetch(`${APISource}processed_measurements/?name=${qhawax}&interval_minutes=${time}`).catch(err => console.log(err));;
	return await response.json();
}
export { 
    requestAverageMeasurement,
    requestAllQhawax,
    requestBinnacle,
    requestStatus,
    downloadData,
    requestInstallationDate,
    handleError,
    requestGraphicsData
}