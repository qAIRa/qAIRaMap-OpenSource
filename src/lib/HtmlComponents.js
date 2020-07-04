const viewMap = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animated fadeInDown" id="map"></div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
  <a id="close" class="modal-close right responsive-img modal-images-close">X</a>
  <div class="modal-content center" id="graphicValues">
  </div>
</div>
`;


const viewDownload = `
<div class="row">
    <div class="col s6 offset-s3">
        <div class="card-pannel z-depth-5">
            <form action="">
                <h5 class="center-align">Descarga la data de medición de calidad del aire</h5>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                              <div class="switch center-align">
                              <label>
                                Promedio Horario
                                <input type="checkbox" checked="checked" id="select-data">
                                <span class="lever"></span>
                                Data Cruda
                              </label>
                              </div><br>
                        <select class="browser-default center-align" name="" id="selectQhawax">
                        <option value="" disabled selected> Selecciona un qHAWAX</option>
                        </select>
                    </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                      <label for="initDate">Fecha de Inicio</label>
                      <input type="text" class="datepicker center-align" name="initDate">
                    </div>
                    <div class="col s6">
                        <label for="initHour">Hora de Inicio</label>
                        <input type="text" class="timepicker center-align" name="initHour">
                    </div>
                </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                        <label for="endDate">Fecha de fin</label>
                        <input type="text" class="datepicker center-align" name="endDate">
                      </div>
                    <div class="col s6">
                      <label for="endHour">Hora de fin</label>
                      <input type="text" class="timepicker center-align" name="endHour">
                    </div>
                  </div>
                  <div class="row">
                  <div class="center-align">
                  <button id="submit-btn" class="btn waves-effect waves-light" >Descargar
                    <i class="material-icons right">send</i>
                  </button>
                </div>
                </div>
			</form>
			<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
        </div>
    </div>
	</div>
	
`;



export { viewMap,
  viewDownload,
  
}