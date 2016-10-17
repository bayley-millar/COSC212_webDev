var ShowHide = (function () {
    'use strict';
    var pub = {};


    function showHideDetails() {

        $(this).siblings().slideToggle(1000);
    }


    pub.setup = function () {
        $('h3').css('cursor', 'pointer').click(showHideDetails);

    };

    return pub;
}());


$(document).ready(ShowHide.setup);


    