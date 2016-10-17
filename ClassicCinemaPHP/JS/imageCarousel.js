/**
 * Created by bmillar on 7/21/16.
 */

var Carousel = (function(){
    var pub = {};
    var categoryList = [];
    var categoryIndex = 0;


    function nextCategory() {
        var element = document.getElementById("img_carousel");
        element.innerHTML = categoryList[categoryIndex].makeHTML();
        categoryIndex += 1;
        if (categoryIndex >= categoryList.length) {
            categoryIndex = 0;
        }
        size();
    }

    function MovieCategory(title, image, page) {

        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function() {
            return "<a href='" + this.page + "'><figure> <img src='" + this.image +"'><figcaption>" + this.title + "</figcaption>  </figure></a>";
        };
    }

    function fadeInOut() {
        $("#img_carousel").animate({opacity: 1},
            2000, "swing");
        $("#img_carousel").animate({opacity: 0},
            2000, "swing", fadeInOut);


    }

    function size() {
        $("img").animate({
            opacity: "0.0",
            width: "300px",
            height: "toggle",
            right: "300px"
        }, 1000, "swing");
        $("img").animate({
            opacity: '1.0',
            width: "toggle"


        }, 1000, "swing");

    }



    pub.setup = function() {
        categoryList.push(new MovieCategory("Classic",
            "images/Metropolis.jpg", "classic.php"));
        categoryList.push(new MovieCategory("Science Fiction",
            "images/Plan_9_from_Outer_Space.jpg", "scifi.php"));
        categoryList.push(new MovieCategory("Alfred Hitchcock",
            "images/Vertigo.jpg", "hitchcock.php"));
        nextCategory();
        setInterval(nextCategory, 4000);
        fadeInOut();
        size();

    };
    return pub;


}());




if (window.addEventListener) {
    window.addEventListener('load', Carousel.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Carousel.setup);
} else {

    window.alert("Could not attach 'MovieCategories.setup' to the 'window.onload' event");
}

