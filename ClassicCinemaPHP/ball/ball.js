// Function to make the ball bounce around
function moveBall(vx, vy) {
    var x, y, tx, ty, p, t;
    $("#ball").stop();

    // Find out where the ball is
    x = parseInt($("#ball").css("paddingLeft"), 10);
    y = parseInt($("#ball").css("paddingTop"), 10);

    // See where the ball is going
    tx = x + vx;
    ty = y + vy;

    t = 1000;

    // Check that we've not gone over the  sides

    // Left
    if (tx <= 0) {
        p = Math.abs(x / vx);
        tx = 0;
        ty = y + p * vy;
        t = p * t;
    }

    // Right
    if (tx >= 250) {
        p = Math.abs((250 - x) / vx);
        tx = 250;
        ty = y + p * vy;
        t = p * t;
    }

    // Top
    if (ty <= 0) {
        p = Math.abs(y / vy);
        ty = 0;
        tx = x + p * vx;
        t = p * t;
    }

    // Bottom
    if (ty >= 249.5) {
        p = Math.abs((250 - y) / vy);
        ty = 250;
        tx = x + p * vx;
        t = p * t;
    }

    // If we've hit a side, bounce

    // Left - need vx to be positive
    if (tx <= 0.5) {
        vx = Math.abs(vx);
    }

    // Right - need vx to be negative
    if (tx >= 249.5) {
        vx = -Math.abs(vx);
    }

    // Top - need vy to be positive
    if (ty <= 0.5) {
        vy = Math.abs(vy);
    }

    // Bottom - need vy to be negative
    if (ty >= 249.5) {
        vy = -Math.abs(vy);
    }

    // Animate this part of the motion, and then make a recursive call
    $("#ball").animate({paddingTop: ty + "px", paddingLeft: tx + "px"}, t, "swing", function () {moveBall(vx, vy); fadeInOut(tx) });

}

// Function to set the ball's location. Also stops the ball moving
function setBall(x, y) {
    $("#ball").stop();
    $("#ball").css({paddingTop: y + "px", paddingLeft: x + "px"});
}

function fadeInOut(x) {
    this.x = x;
    $("#ball").animate({opacity: x/250});
}



$(document).ready(function () {
    setBall(30, 40);
    moveBall(-90, 65);
});