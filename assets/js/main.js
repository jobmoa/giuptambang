/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

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
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
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
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const fadeSections = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1, // 요소가 10% 보일 때 반응
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 나타날 때
                entry.target.classList.add('appear');
            } else {
                // 화면에서 벗어날 때
                entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");

    function handleScroll() {
        const rect = intro.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // #intro가 뷰포트에 들어오면 appear 클래스를 추가
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            intro.classList.add("appear");
        } else {
            intro.classList.remove("appear");
        }
    }

    // 스크롤 이벤트에 핸들러 등록
    window.addEventListener("scroll", handleScroll);

    // 초기 상태 업데이트
    handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll(".wrapper");

    function handleScroll() {
        wrappers.forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // .wrapper가 뷰포트에 들어오면 appear 클래스를 추가
            if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
                wrapper.classList.add("appear");
            } else {
                wrapper.classList.remove("appear");
            }
        });
    }

    // 스크롤 이벤트에 핸들러 등록
    window.addEventListener("scroll", handleScroll);

    // 초기 상태 업데이트
    handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll(".wrapper");

    function handleScroll() {
        wrappers.forEach(wrapper => {
            const inner = wrapper.querySelector('.inner');
            const rect = wrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // 요소가 뷰포트 안에 들어오면 inactive 클래스를 제거
            if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
                wrapper.classList.remove("inactive");
            } else {
                // 요소가 뷰포트를 벗어나면 inactive 클래스를 추가
                wrapper.classList.add("inactive");
            }
        });
    }

    // 스크롤 이벤트에 핸들러 등록
    window.addEventListener("scroll", handleScroll);

    // 초기 상태 업데이트
    handleScroll();
});
