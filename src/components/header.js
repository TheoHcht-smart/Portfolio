import $ from 'jquery';

let lastCurrentSection = $('#home');

function selector_update(nav, currentSection) {

    nav.find('div').removeClass('active-nav-svg');
    var currentNav = nav.find('a[href="#' + currentSection.attr('id') + '"]');
    var selector = nav.find('.selector');

    if (currentNav) {

        if (currentSection.attr('id') == "contact") {
            selector.stop(true, true).animate({
                opacity: 0
            }, 200);

        } else {

            currentNav.find('div').addClass('active-nav-svg');
            var nav_left = currentNav.parent().position().left;
            var nav_width = currentNav.outerWidth();

            selector.stop(true, true).animate({
                opacity: 1,
                width: nav_width + 'px',
                left: nav_left + 'px'
            }, 200);
        }

    }
}


function check_selector(nav, sections, lastCurrentSection) {
    
    var cur_pos = $(window).scrollTop();
    var maxVisibleHeight = -1;
    var currentSection = null;

    sections.each(function() {
        var top = $(this).offset().top;
        var bottom = top + $(this).outerHeight();
        var visibleTop = Math.max(top, cur_pos);
        var visibleBottom = Math.min(bottom, cur_pos + $(window).height());
        var visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSection = $(this);
            
        }
    });

    if (currentSection && lastCurrentSection) {
        if(lastCurrentSection.attr('id') != currentSection.attr('id')) {
            selector_update(nav, currentSection);
        }
    }
    return currentSection;
}


export function header_events() {

    var sections = $('section');
    var nav = $('nav');

    $(window).on('scroll', function() {
        lastCurrentSection = check_selector(nav, sections, lastCurrentSection);
    });


    window.addEventListener('resize', function(event) {
        selector_update(nav, lastCurrentSection);
    }, true);

    selector_update(nav, lastCurrentSection);
}