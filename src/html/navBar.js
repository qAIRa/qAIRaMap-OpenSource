const navbar = `
<div class="navbar-fixed">
<nav id="nav-menu-bar" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">
<ul id="menu-left-bar" class="left hide-on-med-and-down">
<li class="menu-btn" id="home-menu"><a >Home</a></li>
<li class="menu-btn" id="return-menu"><a >Map</a></li>
</ul> 
<a href="https://www.qairadrones.com" class="brand-logo center"id="brand-logo-menu-bar">
<img src="/img/logo-white.png" alt="logo qAIRa"id="logo-menu-qAIRa"style="max-width: 4.5em; max-height: 2em"/>
</a>
<ul id="menu-list-bar" class="right hide-on-med-and-down">
<li class="menu-btn" id="legend-menu"><a class="dropdown-trigger" href="#" data-target="dropdown1">Legend</a></li>
<li class="menu-btn" id="download-menu"><a>Download</a></li>
<li class="menu-btn" id="dashboard-menu"><a>Dashboard</a></li>
<li class="menu-btn" id="graphics-menu"><a>Graphics</a></li>
</ul>
<a href="#" id="menu-trigger" class="sidenav-trigger" data-target="mobile-nav" ><i class="material-icons">menu</i></a>
</div>
</nav>
</div>

<!-- Mobile menu -->
<ul id="mobile-nav" class="sidenav">
<li class="menu-btn" id="home-menu-mobile" ><a>Home</a></li>
<li class="menu-btn" id="return-menu-mobile" ><a>Map</a></li>
<li class="menu-btn" id="legend-menu-mobile"><a class="dropdown-trigger" href="#" data-target="dropdown2">Legend</a></li>
<li class="menu-btn" id="download-mob-menu"><a>Download</a></li>
<li class="menu-btn" id="dashboard-menu-mob"><a>Dashboard</a></li>
<li class="menu-btn" id="graphics-menu-mob"><a>Graphics</a></li>
</ul>

<!-- Modal Air INCA Structure -->
<div id="modalAirInca" class="modal">
<span class="modal-close right">X</span>
<div class="modal-content center">
<p><a href="http://www.minam.gob.pe/wp-content/uploads/2016/07/RM-N%C2%B0-181-2016-MINAM.pdf"> Source: Resolución Ministerial N°-181-2016-MINAM.</a>
</p><img class="responsive-img" src="/img/INCA - Calidad del Aire.png" alt="Tabla colores INCA" />
</div>
<div class="modal-footer"></div>
</div>
<!-- Modal Ruido ECA Structure -->
<div id="modalRuidoEca" class="modal">
<span class="modal-close right">X</span>
<div class="modal-content center">
<p> <a href="https://www.oefa.gob.pe/?wpfb_dl=19087">  Source: Contaminación Sonora OEFA </a> </p>
<img class="responsive-img" src="/img/ECA-Ruido.png" alt="Tabla colores ECA-Ruido"/>
</div>
<div class="modal-footer"></div>
</div>
<!-- Modal UV ECA Structure -->
<div id="modalUVEca" class="modal">
<span class="modal-close right">X</span>
<div class="modal-content center">
<p><a href="https://apps.who.int/iris/bitstream/handle/10665/42633/9243590073.pdf;jsessionid=A51BDAB9660F30189903E31DAAF806ED?sequence=1" > Source: OMS-Radiación Ultravioleta-2003</a>
</p>
<img class="responsive-img" src="/img/Indice-UV.png" alt="Tabla colores UV"/>
</div>
<div class="modal-footer"></div>
</div>

<!-- Modal Aire ECA Structure -->
<div id="modalAireEca" class="modal">
<span class="modal-close right">X</span>
<div class="modal-content center">
<p><a href="http://www.minam.gob.pe/wp-content/uploads/2017/06/DS-003-2017-MINAM.pdf"> Source: DS Nº 003-2017-MINAM </a>
</p>
<img class="responsive-img" src="/img/ECA-aire.png" alt="Tabla ECA Aire"/>
</div>
<div class="modal-footer"></div>
</div>
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
<!-- Dropdown Structure 2-->
<ul id="dropdown2" class="dropdown-content">
<li><a class="modal-trigger" href="#modalAirInca">Gas Legend (INCA)</a></li>
<li class="divider" tabindex="-1"></li>
<li><a class="modal-trigger" href="#modalRuidoEca">Noise Legend (ECA)</a></li>
<li class="divider" tabindex="-1"></li>
<li><a class="modal-trigger" href="#modalUVEca">UV Legend (ECA)</a> </li>
<li class="divider" tabindex="-1"></li>
<li><a class="modal-trigger" href="#modalAireEca">Air Legend (ECA)</a> </li>
</ul>
`;

const navbarDrone = `
<div class="navbar-fixed">
<nav id="nav-menu-bar" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">
<ul id="menu-left-bar" class="left hide-on-med-and-down">
<li class="menu-btn" id="home-menu"><a >Home</a></li>
<li class="menu-btn" id="return-menu-drone"><a >Map</a></li>
</ul> 
<a href="https://www.qairadrones.com" class="brand-logo center"id="brand-logo-menu-bar">
<img src="/img/logo-white.png" alt="logo qAIRa"id="logo-menu-qAIRa"style="max-width: 4.5em; max-height: 2em"/>
</a>
<ul id="menu-list-bar" class="right hide-on-med-and-down">
<!--<li class="menu-btn" id="download-menu-drone"><a>Download</a></li>-->
<li class="menu-btn" id="flight-menu"><a>All Flights</a></li>
<!--<li class="menu-btn" id="graphics-menu-drone"><a>Graphics</a></li>-->
</ul>
<a href="#" id="menu-trigger" class="sidenav-trigger" data-target="mobile-nav" ><i class="material-icons">menu</i></a>
</div>
</nav>
</div>

<!-- Mobile menu -->
<ul id="mobile-nav" class="sidenav">
<li class="menu-btn" id="home-menu-mobile"><a>Home</a></li>
<li class="menu-btn" id="return-menu-mobile-drone"><a>Map</a></li>
<!--<li class="menu-btn" id="download-mob-menu-drone"><a>Download</a></li>-->
<li class="menu-btn" id="flight-menu-mob"><a>All Flights</a></li>
<!--<li class="menu-btn" id="graphics-menu-mob-drone"><a>Graphics</a></li>-->
</ul>
`;

export {navbar, navbarDrone}