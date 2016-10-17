/**
 * Created by bmillar on 7/28/16.
 */
/*global Cookie*/

var Cart = (function () {
    "use strict";
    var pub = {};

    function addToCart() {
        var itemList, newItem;
        itemList = Cookie.get("cart");
        if (itemList) {
            itemList = JSON.parse(itemList);
        } else {
            itemList = [];
        }
        newItem = {};
        newItem.title = $(this).parent().parent().find("h3").html();
        newItem.price = $(this).parent().find(".price").html();

        itemList.push(newItem);
        Cookie.set("cart", JSON.stringify(itemList));
    }

    pub.setup = function () {
        $(".buy").click(addToCart);
        
    };
    return pub;
}());



$(document).ready(Cart.setup);