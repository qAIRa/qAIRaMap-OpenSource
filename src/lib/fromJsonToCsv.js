import { addZero } from './mapAssets.js';

const index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];

const json2csv = (jsonData, jsonFields) => {
  let csvStr = `${jsonFields.join(',')}\n`;

  for (let i = 0; i < jsonData.length; i++) {
    const newFormat = new Date(jsonData[i].timestamp_zone);
    const year = String(newFormat).slice(11, 24);
    const month = String(addZero(index.findIndex((m) => m === String(newFormat).slice(4, 7)) + 1));
    const day = String(newFormat).slice(8, 10);

    jsonData[i].timestamp_zone = `${day}/${month}/${year}`;
    csvStr += `${Object.getOwnPropertyNames(jsonData[i]).map((e) => jsonData[i][e]).join(',')}\n`;
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
      fileName,
    );
  } else if (URL && 'download' in a) {
    // html5 A[download]
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      }),
    );
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = `data:application/octet-stream,${encodeURIComponent(content)}`; // only this mime type is supported
  }
};

export { json2csv, download };
