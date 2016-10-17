/**
 * Created by bmillar on 7/28/16.
 */
var Cookie = (function () {
    var pub = {};

    pub.set = function (name, value, hours) {
        var date, expires;
        if (hours) {
            date = new Date();
            date.setHours(date.getHours() + hours);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        var ename = encodeURIComponent(name);
        var evalue = encodeURIComponent(value);

        document.cookie = ename + "=" + evalue + expires + "; path=/";

    };
    pub.get = function (name) {
        var nameEq, cookies, cookie, i;

        ename = encodeURIComponent(name);


        nameEq = ename + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(nameEq) === 0) {
                return decodeURIComponent(cookie.substring(nameEq.length, cookie.length));
            }
        }
        return null;
    };
    pub.clear = function (name) {
        pub.set(name, "", -1);
    };
    return pub;
}());

