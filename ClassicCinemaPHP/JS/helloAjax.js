function doAjax() {
    $("#helloResult").load("ajaxResponse.html");
}
function setup() {
    $("#helloButton").click(doAjax);
}
$(document).ready(setup);