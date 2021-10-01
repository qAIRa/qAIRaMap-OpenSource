export const viewMap = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__swing" id="over_map_qairito"></div>
<div class="animate__animated animate__swing" id="over_map">
<table class="centered">
<caption><strong>Air Quality Index (INCA)</strong></caption>
<thead><tr><th class="inca-color1">Good</th><th class="inca-color1">Moderate</th><th class="inca-color1">Bad</th><th class="inca-color1">Hazardous</th></tr></thead>
<tbody><tr><td bgcolor="#009966" class="inca-color"></td>
<td bgcolor="#ffde33" class="inca-color"></td>
<td bgcolor="#ff9933" class="inca-color"></td>
<td bgcolor="#cc0033" class="inca-color"></td></tr>
<tr>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-good" src="img/qairito/qairito_buena.gif" alt="qairito-good"></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-moderate" src="img/qairito/qairito_moderada.gif" alt="qairito-moderate" ></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-bad" src="img/qairito/qairito_mala.gif" alt="qairito-bad" ></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-hazardous" src="img/qairito/qairito_cuidado.gif" alt="qairito-hazardous"></img></td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;
