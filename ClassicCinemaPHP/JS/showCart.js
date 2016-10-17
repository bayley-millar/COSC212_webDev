/**
 * Created by bmillar on 7/28/16.
 */
var ShowCart = (function () {
    "use strict";
    var pub = {};
    var showCost = $("#total");

    /**This setup method will display the title and cost
     * of the movies in a shopping cart like fashion.
     */
    pub.setup = function()
    {
        var i;
        var cart = JSON.parse(Cookie.get("cart"));
        var totalCost = 0;
        var name;
        var cost;
        if (Cookie.get("cart")) {
            $('#checkoutForm').show();
            for (i = 0; i < cart.length; i += 1) {
                name = cart[i].title;
                cost = cart[i].price;
                $('#cart').append("<tr><td>" + name + "</td><td>"+ "$"  + cost + "</td></tr>");
                totalCost += parseFloat(cost);

            }
            showCost.html("your total cost is " + "$" + totalCost.toFixed(2));
            
        } else {
            $('#checkoutForm').hide();
            $('#cart').html("Nothing in your shopping cart.");
        }
        
    };return pub;
}());

$(document).ready(ShowCart.setup);