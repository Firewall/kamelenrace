if (Meteor.isClient) {

    //var player_id = Players.insert({name: '', idle: false});

    /*Template.hello.greeting = function () {

     return "";
     };*/


    var player1Location;


    Template.hello.rendered = function () {
        if (!this._rendered) {
            this._rendered = true;
            console.log('Template onLoad');
            player1Location = $("#player1").offset()

        }
    }

// I get a console error in here
//    Meteor.setInterval(
//        function () {
//            var top = player1Location.top;
//            var left = player1Location.left - 0.1;
//
//            console.log("clicked top : " + top + "left " + left);
//            // template data, if any, is available in 'this'
//            $("#player1").offset({ top: top, left: left })
//
//            player1Location = $("#player1").offset()
//
//
//            if (typeof console !== 'undefined')
//                console.log("You pressed the button");
//        }, 10
//
//    )
//
//    Template.hello.events({
//        'click input#1': function () {
//            var top = player1Location.top;
//            var left = player1Location.left - 50;
//
//
//            console.log("clicked top : " + top + "left " + left);
//            // template data, if any, is available in 'this'
//            $("#player1").offset({ top: top, left: left })
//
//            player1Location = $("#player1").offset()
//
//
//            if (typeof console !== 'undefined')
//                console.log("You pressed the button");
//        }
//
//    });

    Template.messages.messages = function () {
        return Messages.find({}, { sort: {time: 1} });
    };


    ////////// Helpers for in-place editing //////////

    // Returns an event_map key for attaching "ok/cancel" events to
    // a text input (given by selector)
    var okcancel_events = function (selector) {
        return 'keyup ' + selector + ', keydown ' + selector + ', focusout ' + selector;
    };

    // Creates an event handler for interpreting "escape", "return", and "blur"
    // on a text field and calling "ok" or "cancel" callbacks.
    var make_okcancel_handler = function (options) {
        var ok = options.ok || function () {
        };
        var cancel = options.cancel || function () {
        };

        return function (evt) {
            if (evt.type === "keydown" && evt.which === 27) {
                // escape = cancel
                cancel.call(this, evt);
            } else if (evt.type === "keyup" && evt.which === 13) {
                // blur/return/enter = ok/submit if non-empty
                var value = String(evt.target.value || "");
                if (value)
                    ok.call(this, value, evt);
                else
                    cancel.call(this, evt);
            }
        };
    };

    Template.entry.events = {};

    Template.entry.events[okcancel_events('#chatInput')] = make_okcancel_handler({
        ok: function (text, event) {
            var nameEntry = document.getElementById('chatInput');
            if (nameEntry.value != "") {
                var ts = Date.now() / 1000;
                Messages.insert({
                        name: nameEntry.value,
                        message: text,
                        time: ts},
                    function () {
                        var elem = document.getElementById('chat');
                        elem.scrollTop = elem.scrollHeight;

                    });
                event.target.value = "";

            }
        }
    })


// ----------------------------------------------------------------------------
// All animation for the ballThrowLocation

    // Gives us a "class" of a circle where we can use all the properties
    function Circle(middlepointX, middlepointY, radius, nr){
        this.middlepointX = middlepointX;
        this.middlepointY = middlepointY;
        this.radius = radius;
        this.nr = nr;
    }

    // Declare al the fields
    var ballFieldWidth = 0;
    var ballWidth = 0;
    var lx = 0,
        ly = 0,
        ox = 0,
        oy = 0;
    var ball;
    var holesArray;
    var snapBall;

    // Sets the needed field to its proper values
    function initVariables() {
        ballFieldWidth = $('#ballTrowLocation').width();
        ballWidth = 20;

        holesArray = new Array();
        holesArray[0] = new Circle(ballFieldWidth / 2, 130, ballWidth + 20, '1');
        holesArray[1] = new Circle(ballFieldWidth / 2 - 2.5 * ballWidth, 70, ballWidth + 15, '2');
        holesArray[2] = new Circle(ballFieldWidth / 2 + 2.5 * ballWidth, 70, ballWidth + 11, '3');
        holesArray[3] = new Circle(ballFieldWidth / 2 + 5 * ballWidth, 30, ballWidth + 7, '4');
        holesArray[4] = new Circle(ballFieldWidth / 2 - 5 * ballWidth, 30, ballWidth + 4, '5');

        //select the canvas to add snaps
        snapBall = Snap('#ballTrowLocation');

        //we make the holes at the top
        var svgHole1 = drawHole(holesArray[0].middlepointX, holesArray[0].middlepointY, holesArray[0].radius, holesArray[0].nr);
        var svgHole2 = drawHole(holesArray[1].middlepointX, holesArray[1].middlepointY, holesArray[1].radius, holesArray[1].nr);
        var svgHole3 = drawHole(holesArray[2].middlepointX, holesArray[2].middlepointY, holesArray[2].radius, holesArray[2].nr);
        var svgHole4 = drawHole(holesArray[3].middlepointX, holesArray[3].middlepointY, holesArray[3].radius, holesArray[3].nr);
        var svgHole5 = drawHole(holesArray[4].middlepointX, holesArray[4].middlepointY, holesArray[4].radius, holesArray[4].nr);
    }

    // the code for drawing a hole at the top
    function drawHole(x, y, r, number){
        var hole = snapBall.circle(x, y, r);
        hole.attr({
            fill: '#C7C7C7',
            stroke: '#000',
            strokeWidth: '3'
        });
        var text = snapBall.text(x - 7, y + 10, number);
        text.attr({
            fill: '#fff',
            'font-size': '30px',
            'font-weight': 'bold'
        });
        return hole;
    }

    // resets the ball so that the ball comes at it 's starting place
    function resetBall() {
        // init coordinates
        ox = ballFieldWidth / 2;
        oy = 600;

        //make circle
        var newBall = snapBall.circle(0, 0, ballWidth);
        newBall.transform('t' + ox + ',' + oy);

        //we give the circle the color of red
        newBall.attr({
            fill: 'r()#FF0000-#B30000',//'FF0000''#D40404',
            stroke: '#000',

            strokeWidth: '1'
        });

        // We make the ball draggable
        newBall.drag(moveFnc, startFnc, endFnc);

        return newBall;
    }

    // We use these three functions to make the ball move
    // source : http://stackoverflow.com/questions/19774494/get-coordinates-of-svg-group-on-drag-with-snap-svg
    moveFnc = function(dx, dy, x, y) {
        lx = dx + ox;
        ly = dy + oy;
        this.transform('t' + lx + ',' + ly);

        var i;
        for (i=0; i< holesArray.length; i++){
            checkIfAboveHole(holesArray[i]);
        }

        //console.log('x:' + lx + ', y:' + ly);
    }
    startFnc = function(x, y, e) {  }
    endFnc = function() {
        ox = lx;
        oy = ly;
    }

    // Gets the distance between 2 points
    // The parameters are the coordinates of those 2 points
    function getDistance(x1, y1, x2, y2){
        return Math.sqrt((x2 -x1) * (x2 -x1) + (y2 - y1) * (y2 - y1));
    }

    // The ball goes to the middle of the hole
    function ballInHole1() {
        ball.undrag();  // removes all the drag features, but all the following drags won't be executed
        ball.animate({cx: hole1MiddlepointX - lx, cy:hole1MiddlepointY - ly, r:0}, 1000);
        ball = resetBall(); // he doesn't reset the drag function because of the .undrag()
    }

    // Checks if the ball is above hole 1
    function checkIfAboveHole (hole) {
        if(hole.radius > getDistance(lx, ly, hole.middlepointX, hole.middlepointY)){
            console.log('The ball is above hole ' + hole.nr);
            //ballInHole1();
        }
    }

    // we are going to animate the ball
    // after the element has been rendered
    Template.ball.rendered = function() {

        // sets the correct values on the fields
        initVariables();

        //we create a the ball
        ball = resetBall();

        //console.log('lx:' + lx + ', ly:' + ly);
        //console.log('ox:' + ox + ', oy:' + oy);
    }

}




