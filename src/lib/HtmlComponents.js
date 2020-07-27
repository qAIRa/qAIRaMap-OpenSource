
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

const navbar =`
<div class="navbar-fixed">

<nav id="nav-menu-bar" class="transparent" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">

    <ul id="menu-left-bar" class="left hide-on-med-and-down">
    <li id="return-menu" type="button"><a >Home</a></li>
    </ul> <a id="brand-logo-menu-bar" href="https://www.qairadrones.com" class="brand-logo center"><img id="logo-navbar" src="/img/logo-white.png" alt="logo qAIRa" class="responsive-img" /></a>
    <ul id="menu-list-bar" class="right hide-on-med-and-down">

    <li id="legend-menu"><a class="dropdown-trigger" href="#" data-target="dropdown1">Legend</a></li>
    <li id="download-menu"><a>Download</a></li>
    <li id="dashboard-menu"><a>Dashboard</a></li>
    <li id="graphics-menu"><a>Graphics</a></li>

    </ul>

    <a href="#" id="menu-trigger" class="sidenav-trigger" data-target="mobile-nav" ><i class="material-icons">menu</i></a>
</div>
</nav>
</div>

<!-- Mobile menu -->
<ul id="mobile-nav" class="sidenav">
<li id="return-menu-mobile" type="button"><a>Home</a></li>
<li id="legend-menu-mobile"><a class="dropdown-trigger" href="#" data-target="dropdown1">Legend</a></li>
<li id="download-mob-menu"><a>Download</a></li>
<li id="dashboard-menu-mob"><a>Dashboard</a></li>
<li id="graphics-menu-mob"><a>Graphics</a></li>
</ul>



<!-- Dropdown Structure 1-->
<ul id="dropdown1" class="dropdown-content">
    <li><a class="modal-trigger" href="#modalAirInca">Gas Legend (INCA)</a></li>
    <li class="divider" tabindex="-1"></li>
    <li><a class="modal-trigger" href="#modalRuidoEca">Noise Legend (ECA)</a></li>
    <li class="divider" tabindex="-1"></li>
    <li><a class="modal-trigger" href="#modalUVEca">UV Legend (ECA)</a> </li>
    <li class="divider" tabindex="-1"></li>
    <li><a class="modal-trigger" href="#modalAireEca">Air Legend (ECA)</a> </li>
</ul>


<!-- Modal Air INCA Structure -->
        <div id="modalAirInca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="http://www.minam.gob.pe/wp-content/uploads/2016/07/RM-N%C2%B0-181-2016-MINAM.pdf"
                    >
                        Source: Resolución Ministerial N°-181-2016-MINAM.
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/INCA - Calidad del Aire.png"
                    alt="Tabla colores INCA"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal Ruido ECA Structure -->
        <div id="modalRuidoEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a href="https://www.oefa.gob.pe/?wpfb_dl=19087">
                        Source: Contaminación Sonora OEFA
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/ECA-Ruido.png"
                    alt="Tabla colores ECA-Ruido"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal UV ECA Structure -->
        <div id="modalUVEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="https://apps.who.int/iris/bitstream/handle/10665/42633/9243590073.pdf;jsessionid=A51BDAB9660F30189903E31DAAF806ED?sequence=1		"
                    >
                        Source: OMS-Radiación Ultravioleta-2003
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/Indice-UV.png"
                    alt="Tabla colores UV"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal Aire ECA Structure -->
        <div id="modalAireEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="http://www.minam.gob.pe/wp-content/uploads/2017/06/DS-003-2017-MINAM.pdf"
                    >
                        Source: DS Nº 003-2017-MINAM
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/ECA-aire.png"
                    alt="Tabla ECA Aire"
                />
            </div>
            <div class="modal-footer"></div>
        </div>
`;


const viewDownload = `
<div class="row">
    <div class="col s6 offset-s3">
        <div class="card-pannel z-depth-5">
            <form action="">
                <h5 class="center-align">Download the air quality data</h5>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                              <div class="switch center-align">
                              <label>
                              Hourly average
                                <input type="checkbox" checked="checked" id="select-data">
                                <span class="lever"></span>
                              Raw Data
                              </label>
                              </div><br>
                        <select class="browser-default center-align" name="" id="selectQhawax">
                        <option value="" disabled selected> Select a qHAWAX</option>
                        </select>
                    </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                      <label for="initDate">Initial Date</label>
                      <input type="text" class="datepicker center-align" name="initDate">
                    </div>
                    <div class="col s6">
                        <label for="initHour">Initial Time</label>
                        <input type="text" class="timepicker center-align" name="initHour">
                    </div>
                </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                        <label for="endDate">Final Date</label>
                        <input type="text" class="datepicker center-align" name="endDate">
                      </div>
                    <div class="col s6">
                      <label for="endHour">Final Time</label>
                      <input type="text" class="timepicker center-align" name="endHour">
                    </div>
                  </div>
                  <div class="row">
                  <div class="center-align">
                  <button id="submit-btn" class="btn waves-effect waves-light" >Download
                    <i class="material-icons right">send</i>
                  </button>
                </div>
                </div>
			</form>
			<p class="center"><strong><sub>
      The data has not passed a quality control.</sub></strong></p>
        </div>
    </div>
	</div>
	
`;


    const viewBoard = `   
<table class="responsive-table highlight centered table-calibration">
            <thead>
              <tr>
                <th align="justify">Qhawax</th> 
                <th align="justify">Name</th>  
                <th align="justify">Time</th>
                <th align="justify">SO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">NO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">CO<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">H<sub>2</sub>S<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">O<sub>3</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>2,5</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">PM<sub>10</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify">UV</th>    
                <th align="justify">dB</th>
                <th align="justify">°C</th>
                <th align="justify">H (%)</th>
                <th align="justify">P<br>(kPa)</th>
                <th align="justify">Conection</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
        <tr>
            <th scope="row" align="center" colspan="16" id="wrapper-pagination">
            </th>
        </tr>
    </tfoot>
          </table>
`;

const chartView = `
  <div class="row edition-element">
  <h4 class="center">Real Time Graphics</h4>
	<div class="col s4  ">
    <select class="browser-default" name="" id="selectQhawax">
    <option value="" disabled selected> Select a qHAWAX</option>
	</select>
	</div>
	<div class="col s4  ">
    <select class="browser-default" name="" id="selectTime">
	<option value="" disabled selected> Select time in minutes</option>
	<option value="5"> 5 </option>
	<option value="10"> 10 </option>
	<option value="15"> 15 </option>
	<option value="20"> 20 </option>
	<option value="25"> 25 </option>
	<option value="30"> 30 </option>
	<option value="60"> 60 </option>
	<option value="120"> 120 </option>
	</select>
	</div>
	<br>
	<div class="col s2">
	<a class="waves-effect waves-light btn" id="graphicBtn">Graph</a>
	</div>
	</div>
        <div class="row">
        <div id="chart1" class="chart"></div><br>
        <div id="chart2" class="chart"></div><br>
        <div id="chart3" class="chart"></div><br>
        <div id="chart4" class="chart"></div><br>
        <div id="chart5" class="chart"></div><br>
        <div id="chart6" class="chart"></div><br>
        <div id="chart7" class="chart"></div><br>
        <div id="chart8" class="chart"></div><br>
        <div id="chart9" class="chart"></div><br>
        <div id="chart10" class="chart"></div><br>
        <div id="chart11" class="chart"></div><br>
        <div id="chart12" class="chart"></div><br>
        <div id="chart13" class="chart"></div><br>
        <div id="chart14" class="chart"></div><br>
        <div id="chart15" class="chart"></div><br>
        </div>
    </div>
        
`;



export { viewMap,
  navbar,
  viewDownload,
  viewBoard,
  chartView
}