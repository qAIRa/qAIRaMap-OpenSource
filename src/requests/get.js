const requestAllQhawaxByCompany = async company => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/AllQhawaxByCompany/?company_id=${company}`);
    return  await response.json();
}

const requestAverageMeasurement = async (qhawax, sensor) => {
    const response = await fetch(`https://qairamapnapi-dev.qairadrones.com/api/gas_average_measurement/?qhawax=${qhawax_id}&gas=${sensor}`);
    return  await response.json();
}



export { requestAllQhawaxByCompany,
    requestAverageMeasurement

}