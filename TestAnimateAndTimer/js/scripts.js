var $t;

var animateBall = function ($inTime) {
    //alert('ok ' + $inTime);
    $("#ball").animate({
        marginLeft: "1500px"
    }, $inTime);
};




function myTimer() {

    $t++;
    $("#clock").text("" + $t);
}


$(document).ready(function () {
    $t = 0;

    var myVar=setInterval(function(){myTimer()},1000);

    $('#moveBall1').on('click', function (event) {
        animateBall(10000)
    });
    $('#moveBall2').on('click', function (event) {
        animateBall(7000)
    });
    $('#moveBall3').on('click', function (event) {
        animateBall(4000)
    });
});
