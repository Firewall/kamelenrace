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
    function Circle(middlepointX, middlepointY, radius, nr) {
        this.middlepointX = middlepointX;
        this.middlepointY = middlepointY;
        this.radius = radius;
        this.nr = nr;
    }

    // We declare and/or initialize the fields
    var snapobj,
        canvas,
        holesArray,
        ball, ballRadius = 20,
        ballFieldWidth, ballFieldHeight,
        vx = 0.001, vy = 0.1,
        bounce = -0.5, bounceCount = 5, currentBounce = 0,
        gravity = 0.02,
        isMouseDown = false,
        oldX, oldY,
        time, oldTime,
        timer,
        isAboveHole = false;

    // we are going to add animation to the ball
    // after the element has been rendered
    Template.ball.rendered = function () {

        if (!this._rendered) {
            this._rendered = true;

            // the snap object with width and height
            snapobj = Snap('#ballTrowLocation');
            ballFieldWidth = $('#ballTrowLocation').width();
            ballFieldHeight = $('#ballTrowLocation').height();

            // we make all the holes
            holesArray = new Array();
            holesArray[0] = new Circle(ballFieldWidth / 2, 130, ballRadius + 20, '1');
            holesArray[1] = new Circle(ballFieldWidth / 2 - 2.5 * ballRadius, 70, ballRadius + 15, '2');
            holesArray[2] = new Circle(ballFieldWidth / 2 + 2.5 * ballRadius, 70, ballRadius + 11, '3');
            holesArray[3] = new Circle(ballFieldWidth / 2 + 5 * ballRadius, 30, ballRadius + 7, '4');
            holesArray[4] = new Circle(ballFieldWidth / 2 - 5 * ballRadius, 30, ballRadius + 4, '5');

            //we show the holes at the top
            var i;
            for (i = 0; i < holesArray.length; i++) {
                var hole = snapobj.circle(holesArray[i].middlepointX, holesArray[i].middlepointY, holesArray[i].radius);
                hole.attr({
                    fill: '#C7C7C7',
                    stroke: '#000',
                    strokeWidth: '3'
                });
                var text = snapobj.text(holesArray[i].middlepointX - 7, holesArray[i].middlepointY + 10, holesArray[i].nr);
                text.attr({
                    fill: '#fff',
                    'font-size': '30px',
                    'font-weight': 'bold'
                });
            }

            // we make the ball
            ball = snapobj.circle(ballFieldWidth / 2, 600, ballRadius);
            ball.attr({
                fill: 'r()#FF0000-#B30000',
                stroke: '#000',
                strokeWidth: '1'
            });

            // we make the canvas
            canvas = snapobj.rect(0, 0, ballFieldWidth, ballFieldHeight)
            canvas.attr({
                fill: '#999',
                opacity: 0.0
            });


            // Eventlistener for when there is a click on the canvas
            canvas.mousedown(function () {
                isMouseDown = true;
                oldX = ball.node.cx.baseVal.value;
                oldY = ball.node.cy.baseVal.value;
                oldTime = 0;
                time = Date.now();

                canvas.mouseup(onMouseUp);
                canvas.mousemove(onMouseMove);
            });
            timer = setTimeout(throwBall, 100);
        }
    }

    // the code for drawing a hole at the top
    function drawHole(x, y, r, number) {
        var hole = snapobj.circle(x, y, r);
        hole.attr({
            fill: '#C7C7C7',
            stroke: '#000',
            strokeWidth: '3'
        });
        var text = snapobj.text(x - 7, y + 10, number);
        text.attr({
            fill: '#fff',
            'font-size': '30px',
            'font-weight': 'bold'
        });
    }

    // the handler when the mouse is moving
    function onMouseMove(mouseEvent) {
        // we keep the time
        oldTime = time;
        time = Date.now();

        // we save the old position
        oldX = ball.node.cx.baseVal.value;
        oldY = ball.node.cy.baseVal.value;

        // calculating the velocity
        vx = (mouseEvent.offsetX - oldX) / (time - oldTime);
        vy = (mouseEvent.offsetY - oldY) / (time - oldTime);

        // animate the ball to the current mouse position
        ball.animate({
            cx: mouseEvent.offsetX,
            cy: mouseEvent.offsetY
        }, 1);
    }

    // the handler when the mouse is going up
    function onMouseUp() {
        isMouseDown = false;
        canvas.unmouseup(onMouseUp);
        canvas.unmousemove(onMouseMove);

        currentBounce = 0;
        throwBall()
    }

    // Animation of throwing the ball
    function throwBall() {
        if (isMouseDown == false) {
            // Check if the ball is above a hole
            var i;
            for (i = 0; i < holesArray.length; i++) {
                if (holesArray[i].radius > getDistance(ball.node.cx.baseVal.value, ball.node.cy.baseVal.value, holesArray[i].middlepointX, holesArray[i].middlepointY)) {
                    isAboveHole = true;
                    console.log('The ball is above hole ' + holesArray[i].nr);
                    ballGoesInHole(holesArray[i]);
                    return;
                }
            }

            // If not above a hole, animate the throwing
            if (isAboveHole == false) {

                // the interval of the animation
                var interval = 40;

                // When the ball hits a border of the field,
                // it bounces back
                if (ball.node.cx.baseVal.value - ballRadius < 0) {
                    ball.node.cx.baseVal.value = 0 + ballRadius;
                    vx *= bounce;
                }
                else if (ball.node.cx.baseVal.value + ballRadius > ballFieldWidth) {
                    ball.node.cx.baseVal.value = ballFieldWidth - ballRadius;
                    vx *= bounce;
                }
                if (ball.node.cy.baseVal.value - ballRadius < 0) {
                    ball.node.cy.baseVal.value = 0 + ballRadius;
                    vy *= bounce;
                }
                else if (ball.node.cy.baseVal.value + ballRadius > ballFieldHeight) {
                    ball.node.cy.baseVal.value = ballFieldHeight - ballRadius;
                    vy *= bounce;
                }

                // animates the ball
                ball.animate({
                    cx: ball.node.cx.baseVal.value + vx * interval,
                    cy: ball.node.cy.baseVal.value + vy * interval
                }, interval);

                // if the ball is at the bottom of the field, add a bounce
                if (vy < 0.03 && vy > -0.03 && vx < 0.03 && vx > -0.03 &&
                    ball.node.cy.baseVal.value > ballFieldHeight - ballRadius - 10) {
                    currentBounce++;
                }

                // if the current amount of bounces is lesser than the allowed bounceCount -> bounce
                // else the ball stays still
                if (currentBounce < bounceCount) {
                    vy += gravity;
                    timer = setTimeout(throwBall, interval);
                }
                else {
                    currentBounce = 0;
                }
            }
        }
    }

    // Gets the distance between 2 points
    // The parameters are the coordinates of those 2 points
    function getDistance(x1, y1, x2, y2){
        return Math.sqrt((x2 -x1) * (x2 -x1) + (y2 - y1) * (y2 - y1));
    }

    // The ball goes to the middle of the hole
    function ballGoesInHole(hole) {
        ball.animate({cx: hole.middlepointX, cy:hole.middlepointY, r:0}, 1000);
        setTimeout(resetBall, 1000)
    }

    // Resets the ball
    function resetBall() {
        // the velocity of the ball
        vx = 0.001;
        vy = 0.1;

        // the ball is not above a hole
        isAboveHole = false;

        // position and radius of the ball
        ball.animate({cx:ballFieldWidth / 2, cy:600}, 1);
        ball.animate({r:ballRadius}, 500);

        // animation of the ball
        setTimeout(throwBall, 600)
    }

}




