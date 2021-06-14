export const viewMobileQ=`
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__swing none " id="over_map_qairito"></div>
<div class="animate__animated animate__swing " id="over_map_mobile_colors">
<table class="centered table-inca-color-mob">
<thead><th class="inca-color1-mob">Bajo</th><th class="inca-color1-mob">Moderado</th><th class="inca-color1-mob">Alto</th><th class="inca-color1-mob">Muy Alto</th></thead>
<tbody><tr>
<td bgcolor="#009966" class="inca-color-mob"></td>
<td bgcolor="#ffde33" class="inca-color-mob"></td>
<td bgcolor="#ff9933" class="inca-color-mob"></td>
<td bgcolor="#cc0033" class="inca-color-mob"></td></tr>
</tbody>
</table>
</div>
</div>
`

export const mobileSelection =`
<div class="animate__animated animate__zoomIn z-depth-5 over_map_droneselection row">
<div class="col s12">
<select class="browser-default col s6" name="" id="selectDrone">
<option value="" disabled selected>qHAWAX Móvil</option>
</select>
<select class="browser-default col s6" name="" id="selectSensor">
<option value="" disabled selected>Sensor</option>
<option value="CO">CO<sub>(ug/m3)</sub></option>
<option value="NO2">NO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="O3">O<sub>3</sub><sub>(ug/m3)</sub></option>
<option value="H2S">H<sub>2</sub>S<sub>(ug/m3)</sub></option>
<option value="SO2">SO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="PM25">PM<sub>2,5</sub><sub>(ug/m3)</sub></option>
<option value="PM10">PM<sub>10</sub><sub>(ug/m3)</sub></option>
</select>
<button id="draw-btn" class="btn waves-effect waves-light col s4 offset-s4 disabled" >Dibujar
<i class="material-icons right">send</i>
</button>
</div>
</div>
`


