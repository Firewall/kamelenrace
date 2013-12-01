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


    // we are going to animate the ball
    // after the element has been rendered
    Template.ball.rendered = function() {

        //define some all used variables
        var ballFieldWidth = $('#ballTrowLocation').width();
        var ballWidth = 20;

        //select the canvas to add snaps
        snapBall = Snap('#ballTrowLocation');

        //we make the holes at the top
        var hole1 = drawHole(ballFieldWidth / 2, 130, ballWidth + 20, '1')
        var hole2 = drawHole(ballFieldWidth / 2 - 2.5 * ballWidth, 70, ballWidth + 15, '2')
        var hole3 = drawHole(ballFieldWidth / 2 + 2.5 * ballWidth, 70, ballWidth + 11, '3')
        var hole4 = drawHole(ballFieldWidth / 2 + 5 * ballWidth, 30, ballWidth + 7, '4')
        var hole5 = drawHole(ballFieldWidth / 2 - 5 * ballWidth, 30, ballWidth + 4, '5')

        //we create a circle
        var userCircle = snapBall.circle(ballFieldWidth / 2, 600, ballWidth);

        //we give the circle the color of red
        userCircle.attr({
            fill: 'r()#FF0000-#B30000',//'FF0000''#D40404',
            stroke: '#000',

            strokeWidth: '1'
        })

        userCircle.drag();
    };





}




