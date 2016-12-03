// Try to get from location hash, otherwise use default navigation position
var position = location.hash ? location.hash.substr(1) : 'main';

// Code will run after page be loaded
$(function () {

	// Set initial content using default navigation position
	changePosition(position);

	// Init navigation events
	$('nav li').click(function (arg) {

		// Load another content according to button clicked
		var newPosition = $(arg.target).data('content');
		changePosition(newPosition);

		// Update location hash with selected position
		if (history.pushState) {
			history.pushState(null, null, '#' + newPosition);
		}
		else {
			location.hash = '#' + newPosition;
		}
	});
});

// Load content of the site from another html file based on it's name
function changePosition(position) {

	// Make async call to get additional content
	$.ajax({
		url: "../content/" + position + ".html",
		context: document.body,
		success: function (response) {

			// Dynamically replace content
			$(".content").html(response);

			// Add event to scroll page to top
			$('.scroll-top').click(function () {
				contentScrollTop();
			});
		}
	});
}

function contentScrollTop() {
	$("html, body").animate({scrollTop: 0}, "slow");
}