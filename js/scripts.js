// Unregisters all service workers

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.getRegistrations().then(function (registrations) {
				for (let registration of registrations) {
					registration.unregister()
				}
	})
};


// Overlay
// Adapted from https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp

function openNav() {
	document.getElementById("body").style.cssText = "border: 0;";
	document.getElementById("header").style.cssText = "height: auto;";
	document.getElementById("main-nav").classList.add("overlay-nav");
	document.getElementById("overlay-menu").style.cssText = "display: flex; visibility: visible";
	document.getElementById("main").style.cssText = "display: none; visibility: hidden;";
	document.getElementById("footer").style.cssText = "display: none; visibility: hidden;";
};

function closeNav() {
	document.getElementById("body").style.cssText = "border: inherit;";
	document.getElementById("header").style.cssText = "height: inherit;";
	document.getElementById("main-nav").classList.remove("overlay-nav");
	document.getElementById("overlay-menu").style.cssText = "display: none; visibility: hidden;";
	document.getElementById("main").style.cssText = "display: inherit; visibility: inherit;";
	document.getElementById("footer").style.cssText = "display: inherit; visibility: inherit;";
};


// Trap Focus in Overlay
// Adapted from https://www.taraprasad.com/trap-focus-inside-an-element/
// Also see https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element

jQuery(document).ready(function () {
	jQuery('#overlay-last').on('keydown', function (e) {
		var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
		if (!isTabPressed) {
			return
		}
		if (e.shiftKey) {
			return
		} else {
			jQuery('#skiptocontent').focus();
			e.preventDefault()
		}
			});
	jQuery('#skiptocontent').on('keydown', function (e) {
		var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
		if (!isTabPressed) {
			return
		}
		if (e.shiftKey) {
			jQuery('#overlay-last').focus();
			e.preventDefault()
		} else {
			return
		}
	})
});


// Link cache buster: Takes all site links, changes them from relative to absolute links (if relative in the first place; absolute links stay absolute), adds a random string to the end.
// Note: Add random string bit currently disabled.

RandomiseHref();

function RandomiseHref(){
		var links = document.querySelectorAll("a:not([href^='http']):not([href*='#']):not([href^='mailto']):not([onclick]):not([class='trans-return']):not([class='art-return'])");
		for(var i = 0; i < links.length; i++){
			// var randomString = Math.floor(Math.random()*1000000);
			// links[i].href = links[i].href + "?=" + randomString;
			links[i].href = links[i].href;
		}
};


// Creates unique page-visit stamp
// Adapted from https://stackoverflow.com/a/4929629 and https://stackoverflow.com/a/10211214

// PageVisit();

// function PageVisit() {
//   var randomString = Math.floor(Math.random() * 1000000); 
// 	var alphabet = "abcdefghijklmnopqrstuvwxyz";
// 	var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
// 	var characters = "!@#$%&*";
// 	var symbol1 = characters[Math.floor(Math.random() * characters.length)];
// 	var symbol2 = characters[Math.floor(Math.random() * characters.length)];  
// 	var today = new Date();
// 	var currentdate = new Date();
// 	var datetime = String(currentdate.getDate()).padStart(2, '0') + "/" + String(currentdate.getMonth() + 1).padStart(2, '0') + "/" + currentdate.getFullYear() + ", " + String(currentdate.getHours()).padStart(2, '0') + ":" + String(currentdate.getMinutes()).padStart(2, '0') + ":" + String(currentdate.getSeconds()).padStart(2, '0');
// 	document.getElementById("page-visit").innerHTML = randomString + letter + symbol1 + symbol2 + ' (' + datetime + ')';
// }


// Needed to prevent a "Best Practices" issue created by Google Translate
// Adapted from https://social.technet.microsoft.com/Forums/en-US/809eaecb-fc3b-40e2-ae0b-f2d79feb58b0/need-easy-way-to-force-all-links-to-open-in-new-tab

AddRelNoopener();

function AddRelNoopener(){
		var links = document.querySelectorAll("a");
		for(var i = 0; i < links.length; i++){
				links[i].setAttribute("rel","noopener");
		}
};


// Removes unused Google script that also registers an unload listener
// Adapted from https://stackoverflow.com/a/30073090

$('head').find('script').filter(function(){
    return $(this).attr('src') === 'https://translate.googleapis.com/element/TE_20201130_00/e/js/element/element_main.js'
}).remove();


// Ensures that Google logo for Translate is served at correct size
// Adapted from https://stackoverflow.com/a/30073090

$('body').find('img').filter(function(){
    return $(this).attr('src') === 'https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png'
}).replaceWith( "<img src='https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_42x16dp.png' srcset='https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_42x16dp.png 2x, https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png 1x' sizes='38.5px' width='38.5px' height='14.656px' style='padding-right:3px;' alt='Google Translate' />" );