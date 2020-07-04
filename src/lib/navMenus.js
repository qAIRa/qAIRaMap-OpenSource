const dropdownLegend = `

<!-- Dropdown Structure 1-->
<ul id="dropdown1" class="dropdown-content">
    <li>
        <a class="modal-trigger" href="#modalAirInca">
            Leyenda gases (INCA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalRuidoEca">
            Leyenda ruido (ECA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalUVEca">
            Leyenda índice UV (ECA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalAireEca">
            Leyenda Aire (ECA)
        </a>
    </li>
</ul>

<!-- Dropdown Structure 2-->
        <ul id="dropdown2" class="dropdown-content">
            <li>
                <a class="modal-trigger" href="#modalAirInca">
                    Leyenda gases (INCA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalRuidoEca">
                    Leyenda ruido (ECA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalUVEca">
                    Leyenda índice UV (ECA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalAireEca">
                    Leyenda Aire (ECA)
                </a>
            </li>
        </ul>

<!-- Modal Air INCA Structure -->
        <div id="modalAirInca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="http://www.minam.gob.pe/wp-content/uploads/2016/07/RM-N%C2%B0-181-2016-MINAM.pdf"
                    >
                        Fuente: Resolución Ministerial N°-181-2016-MINAM.
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
                        Fuente: Contaminación Sonora OEFA
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
                        Fuente: OMS-Radiación Ultravioleta-2003
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
                        Fuente: DS Nº 003-2017-MINAM
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

const navbar = (structure) =>`
<div class="navbar-fixed">
<nav id="nav-menu-bar" class="transparent" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">
    <ul id="menu-left-bar" class="left hide-on-med-and-down">
        <li class="client-spin" id="spinNav"></li>
    </ul>
    <a id="brand-logo-menu-bar" href="https://www.qairadrones.com" class="brand-logo center">
        <img
            id="logo-navbar"
            src="/img/logo-white.png"
            alt="logo qAIRa"
            class="responsive-img"
        />
    </a>
    <ul id="menu-list-bar" class="right hide-on-med-and-down">
    </ul>
    <a href="#" id="menu-trigger" class="sidenav-trigger" data-target="mobile-nav" ><i class="material-icons">menu</i></a>
</div>
</nav>
</div>

<!-- Mobile menu -->
<ul id="mobile-nav" class="sidenav">

</ul>
${structure}
`;


const spinMob = `
<li class="client-spin mobile-menu" id="spinMobile"></li>
`;

const legend = `
<li id="legend-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown1"> Leyendas </a>
</li>
`;

const legendMobile = `  
<li id="legend-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown2"> Leyendas </a>
</li>
`;


const chooseSpinnerMenu = company => {
	const navMenu = document.getElementById('spinNav');
	const mobMenu = document.getElementById('spinMobile');
	navMenu.classList.remove(
		'spinSanBorja',
		'spinMiraflores',
		'spinLima',
		'spinQaira',
		'spinMarina'
	);
	mobMenu.classList.remove(
		'spinSanBorjaMobile',
		'spinMirafloresMobile',
		'spinLimaMobile',
		'spinQairaMobile',
		'spinMarinaMobile'
	);
	switch (company) {
		case 4:
			{
				navMenu.classList.add('spinSanBorja');
				mobMenu.classList.add('spinSanBorjaMobile');
			}
			break;

		case 8:
			{
				navMenu.classList.add('spinMiraflores');
				mobMenu.classList.add('spinMirafloresMobile');
			}
			break;

		case 3:
			{
				navMenu.classList.add('spinLima');
				mobMenu.classList.add('spinLimaMobile');
			}
			break;
		case 1:
			{
				navMenu.classList.add('spinQaira');
				mobMenu.classList.add('spinQairaMobile');
			}
			break;
		case 0:
			{
				navMenu.classList.add('spinQaira');
				mobMenu.classList.add('spinQairaMobile');
			}
			break;
		case 9:
			{
				navMenu.classList.add('spinMarina');
				mobMenu.classList.add('spinMarinaMobile');
			}
			break;

		default:
			break;
	}
};


const styledNavBar = (company)=>{
    if (company === 3 || company === 4 || company === 8) {
        const logoMenu = document.getElementById('brand-logo-menu-bar');
        logoMenu.classList.remove('center');
        logoMenu.classList.add('right');
    
        const menuList = document.getElementById('menu-list-bar');
        menuList.classList.remove('right');
        menuList.classList.add('center');
    
        const legendMenu = document.getElementById('legend-menu');
        legendMenu.classList.add('legend-lima');

        const loginMenu = document.getElementById('login-menu');
        loginMenu.classList.add('login-lima');
    
        const logoAdition = document.getElementById('brand-logo-menu-bar');
        const logoClient = document.createElement('img');
        switch (company) {
            case 3:
                {
                    const barMenu = document.getElementById('nav-menu-bar');
                    barMenu.classList.remove('transparent');
                    barMenu.classList.add('mmlNavBar');
                    logoClient.setAttribute(
                        'src',
                        '/img/logo-mml.png'
                    );
                    logoClient.setAttribute('alt', 'logo-muniLima');
                    logoClient.setAttribute('id', 'logo-muniLima');
                }
                break;
            case 4:
                {
                    logoClient.setAttribute(
                        'src',
                        '/img/logo-san-borja.png'
                    );
                    logoClient.setAttribute('alt', 'logo-muniSanBorja');
                    logoClient.setAttribute('id', 'logo-muniSanBorja');
                }
                break;
            case 8:
                {
                    logoClient.setAttribute(
                        'src',
                        '/img/logo-miraflores.png'
                    );
                    logoClient.setAttribute('alt', 'logo-muniMiraflores');
                    logoClient.setAttribute('id', 'logo-muniMiraflores');
                }
                break;
    
            default:
                break;
        }
        logoClient.classList.add('responsive-img');
        logoAdition.appendChild(logoClient);
    };
};


const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const ppbToECAdash = sensor => {
	switch (sensor) {
		case 'CO':
			return { ECA: 10000 * 0.87, factor: 1.144919906 };
		case 'NO2':
			return { ECA: 100 * 0.532, factor: 1.880677075 };
		case 'O3':
			return { ECA: 100 * 0.51, factor: 1.962019118 };
		case 'H2S':
			return { ECA: 150 * 0.719, factor: 1.393033574 };
		case 'SO2':
			return { ECA: 250 * 0.382, factor: 2.618478014 };
		case 'PM25':
			return { ECA: 50, factor: 1 };
		case 'PM10':
			return { ECA: 100, factor: 1 };
		default:
			break;
	}
};

export {navbar,
legend,
dropdownLegend,
legendMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
addZero,
ppbToECAdash
};