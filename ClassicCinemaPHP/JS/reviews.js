/**
 * Created by bmillar on 8/11/16.
 */
var Reviews = (function () {
    'use strict';
    var pub = {};

    function showReviews() {
        var target = $(this).parent().parent().find(".review")[0];
        var source = $(this).parent().parent().find("img").attr("src");
        var xmlSource = source.replace("images/", "reviews/").replace(".jpg", ".xml");
        $.ajax({
            type: "GET",
            url: xmlSource,
            cache: false,
            success: function (data) {
                parseReviews(data, target);

            },
            error: function () {
                $(target).html("No reviews for this film yet.");
            }
        });

    }

    function parseReviews(data, target) {
        $(target).empty();
        $(target).append('<dl></dl>');
        $(data).find("review").each(function () {
            var rating =$(this).find("rating")[0].textContent;
            var user = $(this).find("user")[0].textContent;
            $(target).append("<dt>" + user + ":" + "</dt><dd>" + rating + "</dd>")
        });
        if($(data).find("review").length == 0){
            $(target).html("no reviews");
        }
    }


    pub.setup = function () {
        $(".buy").parent().append('<input type="button" class="showReviews" value="Show Reviews"><div class = "review"></div>');
        $(".showReviews").click(showReviews);


    };

    return pub;
}());
$(document).ready(Reviews.setup);