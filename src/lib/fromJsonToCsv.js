import { addZero } from '../lib/helpers.js';
import { format } from 'date-fns'


const json2csv = (jsonData, jsonFields) => {
  let csvStr = jsonFields.join(',') + '\n';
  for (let i = 0; i < jsonData.length; i++) {
    jsonData[i].timestamp_zone = format(new Date(jsonData[i].timestamp_zone), 'yyyy-MM-dd HH:mm:ss');
    csvStr += Object.getOwnPropertyNames(jsonData[i]).map(e => jsonData[i][e]).join(',') + '\n';
  }
  return csvStr;
};

const download = (csvcontent, fileName) => {
	const uInt8 = new TextEncoder().encode(csvcontent)
	const fileStream = streamSaver.createWriteStream(`${fileName}.csv`, {
		// size: uInt8.byteLength, // (optional filesize) Will show progress
		// writableStrategy: undefined, // (optional)
		// readableStrategy: undefined  // (optional)
	  })
		new Response(csvcontent).body.pipeTo(fileStream)

}

export { json2csv, download };