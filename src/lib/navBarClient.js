import {navbar, 
    } from '../lib/navMenus.js';

const navBarClient = (element, display, company)=>{
    const menuNavBar = document.querySelector('header');
	menuNavBar.innerHTML = navbar(dropdownConfig);

	const menulist = document.querySelector('#menu-list-bar');
	const menuleft = document.querySelector('#menu-left-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');

	menulist.innerHTML = config +logout;
	menuleft.innerHTML = returnArrow;
	menuNavMobile.innerHTML = configMobile+ returnArrowMob;
	
	element.innerHTML = display ;
	
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	
	const modal = element.querySelectorAll('.modal');
	M.Modal.init(modal);
	
}

export {navBarClient}