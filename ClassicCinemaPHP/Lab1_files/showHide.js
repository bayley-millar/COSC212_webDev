function showHideDetails() {
    "use strict";
    var paragraphs, p;
    var img, i;
    paragraphs = this.parentNode.getElementsByTagName("p");


    for (p = 0; p < paragraphs.length; p += 1) {
        if (paragraphs[p].style.display === "none") {
            paragraphs[p].style.display = "block";
        } else {
            paragraphs[p].style.display = "none";
        }
    }

    img = this.parentNode.getElementsByTagName("img")[0];

    if (img.style.display === "none") {
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }

}


function setup() {
    "use strict";
    var f;
    var title;
    var films = document.getElementsByClassName("film");
    for (f = 0; f < films.length; f += 1) {
        title = films[f].getElementsByTagName("h3")[0];
        title.onclick = showHideDetails;
        title.style.cursor = "pointer";
    }
}

if (document.getElementById) {
    window.onload = setup;
}

