import { addZero } from '../lib/mapAssets.js';

const index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const json2csv = (jsonData, jsonFields) => {
  let csvStr = jsonFields.join(',') + '\n';

  for (let i = 0; i < jsonData.length; i++) {
    const newFormat = new Date(jsonData[i].timestamp_zone)
    const year = String(newFormat).slice(11,24);
    const month = String(addZero(index.findIndex(m => m === String(newFormat).slice(4,7))+1));
    const day = String(newFormat).slice(8,10);
    jsonData[i].timestamp_zone = day+'/'+month+'/'+year;
    csvStr += Object.getOwnPropertyNames(jsonData[i]).map(e => jsonData[i][e]).join(',') + '\n';
  }
  return csvStr;
};

const download = (csvcontent, fileName) => {
	const uInt8 = new TextEncoder().encode(csvcontent)
	const fileStream = streamSaver.createWriteStream(`${fileName}+.csv`, {
		size: uInt8.byteLength, // (optional filesize) Will show progress
		writableStrategy: undefined, // (optional)
		readableStrategy: undefined  // (optional)
	  })
		new Response(csvcontent).body.pipeTo(fileStream)

}

export { json2csv, download };