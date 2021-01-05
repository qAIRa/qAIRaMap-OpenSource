import { droneChartRow } from '../lib/HtmlComponents.js';
const showActiveDrones = (element, drone, map) => {
const tableRows = element.querySelector('tbody')
const latlng = {
    lat: parseFloat(drone.lat),
    lng: parseFloat(drone.lon),
  };
tableRows.innerHTML += droneChartRow(drone.comercial_name,latlng)

        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Airplane-logo.png',
			scaledSize: new google.maps.Size(35, 35),
		},
            id: drone.name,
            // animation: google.maps.Animation.DROP,
        });
    map.markers.push(marker);
	const bounds = new google.maps.LatLngBounds();
	for (let i = 0; i < map.markers.length; i++) {
		bounds.extend(map.markers[i].getPosition());
	}
	map.fitBounds(bounds);
    const zoom = map.getZoom();
	map.setZoom(zoom < 13 ? 13 : zoom);
const icons = element.getElementsByClassName('scale-transition')

    setInterval(()=>{
        for (const icon of icons)
        {icon.classList.add('scale-out');
        icon.classList.remove('scale-in')}
        }, 1000);
    setInterval(()=>{
        for (const icon of icons)
        {icon.classList.add('scale-in') ;
        icon.classList.remove('scale-out')}
        }, 2000);
const rowPosition = element.getElementsByClassName('drone_position')

for (const r of rowPosition)
    r.addEventListener('click',e=>{ 
        const result = e.currentTarget.id.split(',')
        const position = { lat:parseFloat(result[0]), lng:parseFloat(result[1])}
        map.panTo(position)
    })

// const geocoder = new google.maps.Geocoder();


// geocoder.geocode({ location: latlng }, (results, status) => {
//     if (status === "OK") {
//       if (results[0]) {
//         map.setZoom(11);
//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map,
//         });
//         tableRows.innerHTML += droneChartRow(drone.comercial_name,results[0].formatted_address)
//         infowindow.setContent(results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert("No results found");
//       }
//     } else {
//       window.alert("Geocoder failed due to: " + status);
//     }
//   });

};

export {
    showActiveDrones,
}