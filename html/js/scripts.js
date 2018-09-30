$(function() {

    "use strict";

    /* Preloader script */
    var width = 100,
        perfData = window.performance.timing,
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime/1000)%60, 10)*100;

    $('.coda-loader-bar').animate({
        width: width + "%"
    }, time);

    var PercentageID = $('#coda-percent'),
        start = 0,
        end = 100,
        duration = time;
    animateValue(PercentageID, start, end, duration);

    function animateValue(id, start, end, duration) {

        var range = end - start,
            current = start,
            increment = end > start? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range)),
            obj = $(id);

        var timer = setInterval(function() {
            current += increment;
            $(obj).text(current + "%");
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    setTimeout(function(){
        $('.coda-preloader').fadeOut(300);
        $('html').removeClass('coda-overflow-hidden')
        $('.coda-header-text').addClass('coda-fade-left')
        $('.coda-top-panel').addClass('coda-fade-in')
    }, time);

    $('*').on('touchstart', function() {
        $(this).trigger('hover');
    }).on('touchend', function() {
        $(this).trigger('hover');
    });

    /* Scroll to DOM Element */
    function codaToggleClass() {
        $('html').toggleClass('coda-overflow-hidden');
        $('.coda-main-content').toggleClass('coda-blur');
    }

    $('.coda-scroll-to-btn').on('click', function(e) {
        e.preventDefault();
        if ($('#menu').hasClass('coda-pop-up-open')) {
            $('#menu').toggleClass('coda-pop-up-open');
            codaToggleClass();
        }
        var scrollTo = $(this).attr('href');
        if ($(scrollTo).length) {
            $('html, body').animate({
                scrollTop: $(scrollTo).offset().top,
            }, 1000);
        }
    });

    /* Pop-up window script */
    function stopEmbedVideo() {
       $('iframe').each(function() {
            var videoSrc = $(this).attr('src');
            $(this).attr('src','');
            $(this).attr('src', videoSrc);
        });
    }

    $('.coda-pop-up-btn').on('click', function(e) {
        e.preventDefault();
        var popUpWindow = $(this).attr('href');
        $(popUpWindow).toggleClass('coda-pop-up-open');
        if(!$(popUpWindow).hasClass('coda-pop-up-open')){
            stopEmbedVideo();
        }
        codaToggleClass();
    });

    /* Filterizr script */
    if ($('.filtr-container').length) {
        var options = {
            animationDuration: 0.5, // in seconds
            filter: 'all', // Initial filter
            controlsSelector: '', // Selector for custom controls
            delay: 0, // Transition delay in ms
            delayMode: 'progressive', // 'progressive' or 'alternate'
            easing: 'ease-in-out',
            filterOutCss: { // Filtering out animation
                opacity: 0,
                transform: 'scale(0.5)'
            },
            filterInCss: { // Filtering in animation
                opacity: 0,
                transform: 'scale(1)'
            },
            layout: 'sameWidth', // See layouts
            multifilterLogicalOperator: 'or',
            selector: '.filtr-container',
            setupControls: true // Should be false if controlsSelector is set
        }

        // You can override any of these options and then call...
        $(window).on('load', function() {
            $('.filtr-container').filterizr(options);
        })

        var navElementActive = options.filter;
        $('.coda-filter-nav').find('.coda-filter-nav-item[data-filter="' + navElementActive + '"]').addClass('coda-active');
        $('.coda-filter-nav .coda-filter-nav-item').on('click', function(){
            $('.coda-filter-nav .coda-filter-nav-item').removeClass('coda-active');
            $(this).addClass('coda-active');
        });
    }

    /* Experience timeline script */
    if ($('.coda-experience-content').length) {
        var experienceFilter = $('.coda-experience-filter-nav');
        var experienceTimeline = $('.coda-experience-timeline');
        experienceFilter.find('.coda-filter-nav-item:first-of-type').addClass('coda-active');
        $('.coda-experience-timeline-content').find('.coda-experience-timeline:first-of-type').addClass('coda-active');
        $('.coda-experience-timeline').find('div:nth-child(2)').addClass('coda-active');
        $('.coda-experience-content').find('.coda-experience-description-item:first-of-type').addClass('coda-active');
        $('.coda-experience-description-item').find('.coda-experience-description:first-of-type').addClass('coda-active')
        !function (e) {
            e(function () {
                experienceFilter.on('click', '.coda-filter-nav-item:not(.coda-active)', function () {
                    e(this).addClass('coda-active').siblings().removeClass('coda-active');
                    $('.coda-experience-timeline-content').find('.coda-experience-timeline').removeClass("coda-active").eq(e(this).index()).addClass("coda-active");
                    $('.coda-experience-content').find('.coda-experience-description-item').removeClass("coda-active").eq(e(this).index()).addClass("coda-active");
                });
                experienceTimeline.on('click', '.coda-experience-timeline-caption:not(.coda-active)', function () {
                    e(this).addClass("coda-active").siblings().removeClass("coda-active");
                    $('.coda-experience-description-item.coda-active').find('.coda-experience-description').removeClass("coda-active").eq(e(this).index() - 1 ).addClass("coda-active");
                });
            });
        }(jQuery);
    }

    /* Skills bar script */
    if ($('.coda-skills-bar-container').length) {
        inView('.coda-skills-bar-container').on('enter', function (el) {
            $(el).find('.coda-skill-bar').each(function () {
                var width = $(this).find('.coda-skill-bar-bar').width();
                if (width < 1) {
                    $(this).find('.coda-skill-bar-bar').animate({
                        width: $(this).attr('data-percent') + '%',
                    }, 1500);
                    var skillPercent = $(this).attr('data-percent');
                    $(this).find('.coda-skill-bar-percent').find('.coda-skill-count').text(skillPercent);
                    $(this).find('.coda-skill-count').each(function () {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 1500,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                }
            });
        });
    }

    // Contact form script
    if ($('.coda-contact-form').length) {
        $('.coda-contact-form .coda-input').blur(function () {
            if (this.value) {
                $(this).addClass('coda-label-up');
            } else {
                $(this).removeClass('coda-label-up');
            }
        });
    }

    $(window).on('scroll', function () {
        var scroll = $(this).scrollTop();
        if ( scroll > $(window).height() ) {
            $('.coda-scroll-to-top').addClass('coda-active-btn');
        } else {
            $('.coda-scroll-to-top').removeClass('coda-active-btn');
        }
    });

});