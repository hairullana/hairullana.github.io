/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

	Modified by Hairul Lana
	hairullana99@gmail.com
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	// get work period
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let work_periods = $('.work-period');
	let last_year_works = $('.last-year-work');

	for (i=0; i<work_periods.length; i++) {
		let work_period = work_periods[i];
		let last_year_work = last_year_works[i];
		let period = $(work_period).html();
		let [start, end] = period.split(' - ');

		let [start_month, start_year] = start.split(' ');
		start_month = months.indexOf(start_month);

		let end_month, end_year;
		if (end == 'Present') {
			let now = new Date();
			end_month = now.getMonth();
			end_year = now.getFullYear();
		} else {
			[end_month, end_year] = end.split(' ');
			end_month = months.indexOf(end_month);
		}

		let start_date = new Date(start_year, start_month);
		let end_date = new Date(end_year, end_month);
		let year_diff = end_date.getFullYear() - start_date.getFullYear();
		let month_diff = end_date.getMonth() - start_date.getMonth();
		const total_month_diff = (year_diff * 12 + month_diff) + 1;

		let fix_year, fix_month;
		if (total_month_diff >= 12) {
			fix_year = Math.floor(total_month_diff / 12);
			fix_month = total_month_diff % 12;

			if (fix_month > 0) work_period.append(` (${fix_year} year${fix_year != 1 ? 's' : ''} ${fix_month} month${fix_month != 1 ? 's' : ''})`);
			else work_period.append(` (${fix_year} year${fix_year != 1 ? 's' : ''})`);
		} else {
			fix_month = total_month_diff;
			work_period.append(` (${fix_month} month${fix_month != 1 ? 's' : ''})`);
		}
	};

})(jQuery);