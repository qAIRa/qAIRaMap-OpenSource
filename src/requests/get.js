const requestAllQhawaxByCompany = async company => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/AllQhawaxByCompany/?company_id=${company}`);
    return  await response.json();
}

const requestAverageMeasurement = async (qhawax, sensor) => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/gas_average_measurement/?qhawax=${qhawax_id}&gas=${sensor}`);
    return  await response.json();
}

const requestAllQhawax = async () => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/get_qhawaxs/`);
    return await response.json();
};

const requestBinnacle = async (ID) => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/get_all_observations_by_qhawax/?qhawax_id=${ID}`);
    return await response.json();
};

const requestStatus = async (ID) =>{
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/qhawax_status/?name=${ID}`);
    return await response.text()
};

export { 
    requestAllQhawaxByCompany,
    requestAverageMeasurement,
    requestAllQhawax,
    requestBinnacle,
    requestStatus
}