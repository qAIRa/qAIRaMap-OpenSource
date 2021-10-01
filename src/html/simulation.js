export const simulationSelection = `
<div class="animate__animated animate__slideInRight z-depth-5 over_map_droneselection row none">
<div class="col s12">
<select class="browser-default col s6" name="" id="selectSensor">
<option value="CO">CO<sub>(ug/m3)</sub></option>
<option value="CO2">CO<sub>2</sub><sub>(ppm)</sub></option>
<option value="NO2">NO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="O3">O<sub>3</sub><sub>(ug/m3)</sub></option>
<option value="H2S">H<sub>2</sub>S<sub>(ug/m3)</sub></option>
<option value="SO2">SO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="PM25">PM<sub>2,5</sub><sub>(ug/m3)</sub></option>
<option value="PM10">PM<sub>10</sub><sub>(ug/m3)</sub></option>
<option value="VOC">VOC<sub>(ug/m3)</sub></option>
</select>
<button id="draw-btn" class="btn waves-effect waves-light col s6" >Draw
<i class="material-icons right">send</i>
</button>
</div>
</div>
`;
export const simulationTurns = `
<div class="animate__animated animate__slideInRight z-depth-5 over_map_droneselection_turn row">
<div class="col s12">
<select class="browser-default center-align" name="" id="selectTurn">
<option value="" disabled selected>Simular otro turno</option>
<option value="1">Turno 8am a 10am</option>
<option value="2">Turno 10am a 12pm</option>
<option value="3">Turno 14pm a 16pm</option>
<option value="4">Turno 16pm a 18pm</option>
</select>
</div>
</div>
`;

export const simulationSelectionMobile = `
<div class="animate__animated animate__slideInRight z-depth-5 over_map_droneselection row none">
<div class="col s12">
<select class="browser-default col s6" name="" id="selectSensor">
<option value="CO">CO<sub>(ug/m3)</sub></option>
<option value="NO2">NO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="O3">O<sub>3</sub><sub>(ug/m3)</sub></option>
<option value="H2S">H<sub>2</sub>S<sub>(ug/m3)</sub></option>
<option value="SO2">SO<sub>2</sub><sub>(ug/m3)</sub></option>
<option value="PM25">PM<sub>2,5</sub><sub>(ug/m3)</sub></option>
<option value="PM10">PM<sub>10</sub><sub>(ug/m3)</sub></option>
</select>
<button id="draw-btn" class="btn waves-effect waves-light col s6" >Dibujar
<i class="material-icons right">send</i>
</button>
</div>
</div>
`;

export const simulationBtns = `
<div class="animate__animated animate__slideInRight over_map_simulation row">
<button id="restart-btn" class="btn waves-effect waves-light col s6 z-depth-5" >Restart simulation
<i class="material-icons right">send</i>
</button>
<button id="dwn-btn" class="btn waves-effect waves-light col s6 z-depth-5" >Download data
<i class="material-icons right">send</i>
</button>
</div>
`;

export const simulationBtnsMobile = `
<div class="animate__animated animate__slideInRight over_map_simulation row">
<button id="restart-btn" class="btn waves-effect waves-light col s6 z-depth-5" >Reiniciar Simulación
<i class="material-icons right">send</i>
</button>
<button id="dwn-btn" class="btn waves-effect waves-light col s6 z-depth-5" >Descarga de Datos
<i class="material-icons right">send</i>
</button>
</div>
`;
