import { format } from 'date-fns';

const json2csv = (jsonData, jsonFields) => {
  let csvStr = `${jsonFields.join(',')}\n`;
  for (let i = 0; i < jsonData.length; i++) {
    jsonData[i].timestamp_zone = format(new Date(jsonData[i].timestamp_zone), 'yyyy-MM-dd HH:mm:ss');
    csvStr += `${Object.getOwnPropertyNames(jsonData[i]).map((e) => jsonData[i][e]).join(',')}\n`;
  }
  return csvStr;
};

// const download = (csvcontent, fileName) => {
// console.log(csvcontent);
// const uInt8 = new TextEncoder().encode(csvcontent)

// const fileStream = streamSaver.createWriteStream(`${fileName}.csv`, {
// size: uInt8.byteLength, // (optional filesize) Will show progress
// writableStrategy: undefined, // (optional)
// readableStrategy: undefined  // (optional)
//   })
// new Response(csvcontent).body.pipeTo(fileStream)

// }

const download = (csvcontent, fileName) => {
  const downloadLink = document.createElement('a');
  const blob = new Blob(['\ufeff', csvcontent]);
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = `${fileName}.csv`; // Name the file here
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export { json2csv, download };
