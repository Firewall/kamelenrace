if (Meteor.isClient) {
    //Routing
    Meteor.Router.add({
        '/': 'home',

        '/game/:_id': { to: 'game', and: function (id) {
            Session.set('GameId', id);
        }},
        '*': 'not_found'
    });

    //Game page JS

    //camel variabels

    //Y coord for camels

    var blueY = 0;
    var greenY = 120;
    var redY = 240;
    var yellowY = 370;

    var ys = [blueY, greenY, redY, yellowY];

    //startlocations of camels
    var startLocationBlue = "t" + [590, blueY] + "s" + [0.25];
    var startLocationGreen = "t" + [590, greenY] + "s" + [0.25];
    var startLocationRed = "t" + [590, redY] + "s" + [0.25];
    var startLocationYellow = "t" + [590, yellowY] + "s" + [0.25];

    var startLocations = [startLocationBlue, startLocationGreen, startLocationRed, startLocationYellow];

    //current X coordinate of camel
    var currentLocationBlueX = 590;
    var currentLocationGreenX = 590;
    var currentLocationRedX = 590;
    var currentLocationYellowX = 590;

    var currentLocations = [currentLocationBlueX, currentLocationGreenX, currentLocationRedX, currentLocationYellowX];


    //The game
    var game;

    //camel objects
    var camelBlue;
    var camelTest

    var camelGreen;
    var camelRed;
    var camelYellow;

    //Game variabels
    console.log(Session.get("GameId"));
    console.log(Session.get("Username"));


    //rendering field
    Template.hello.rendered = function () {
        game = Games.find({}, {GameId: Session.get("GameId")});
        game.observeChanges({
                changed: moveCamels
            }
        );

        //creating field
        var s = Snap("#backgroundRaceField");

        //ading lanes
        var lane1 = s.line(0, 125, 700, 125);
        var lane2 = s.line(0, 250, 700, 250);
        var lane3 = s.line(0, 370, 700, 370);

        lane1.attr({
            stroke: "#000",
            strokeWidth: 5
        });

        lane2.attr({
            stroke: "#000",
            strokeWidth: 5
        });

        lane3.attr({
            stroke: "#000",
            strokeWidth: 5
        });


        //loading svg's of camels + background and foreground of desert
        Snap.load("../img/DesertForeground.svg", onDesertForegroundLane1SVGLoaded);
        Snap.load("../img/DesertForeground.svg", onDesertForegroundLane2SVGLoaded);
        Snap.load("../img/DesertForeground.svg", onDesertForegroundLane3SVGLoaded);
        Snap.load("../img/DesertForeground.svg", onDesertForegroundLane4SVGLoaded);

        //load palm tree's
        Snap.load("../img/Palm_Tree.svg", onPalmThree1SVGLoaded);
        Snap.load("../img/Palm_Tree.svg", onPalmThree2SVGLoaded);
        Snap.load("../img/Palm_Tree.svg", onPalmThree3SVGLoaded);
        Snap.load("../img/Palm_Tree.svg", onPalmThree4SVGLoaded);


        Snap.load("../img/BlueCamel.svg", onBlueCamelSVGLoaded);
        Snap.load("../img/BlueCamel.svg", testing);


        Snap.load("../img/GreenCamel.svg", onGreenCamelSVGLoaded);
        Snap.load("../img/YellowCamel.svg", onYellowCamelSVGLoaded);
        Snap.load("../img/RedCamel.svg", onRedCamelSVGLoaded);

        Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane1SVGLoaded);
        Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane2SVGLoaded);
        Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane3SVGLoaded);
        Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane4SVGLoaded);


        //functions for adding camels to field + scaling svg
        function onBlueCamelSVGLoaded(f) {
            camelBlue = s.group().transform(startLocationBlue).append(f);
            camelBlue.attr({
                //   stroke: "#000",
                //   strokeWidth: 2
            });

        }

        function testing(f) {
            camelTest = s.group().transform("t" + [510, 0] + "s" + [0.25]).attr({visibility: 'hidden'}).append(f);
            camelTest.attr({
                //visibility:'hidden'
            });
        }

        function onGreenCamelSVGLoaded(f) {
            camelGreen = s.group().transform(startLocationGreen).append(f);
        }

        function onYellowCamelSVGLoaded(f) {
            camelYellow = s.group().transform(startLocationYellow).append(f);
        }

        function onRedCamelSVGLoaded(f) {
            camelRed = s.group().transform(startLocationRed).append(f);
        }

        //adding desert foreground and backgrounds
        function onDesertForegroundLane1SVGLoaded(f) {
            s.group().transform("t" + [0, 81] + "s" + [1.7, 1]).append(f);

        }

        function onDesertForegroundLane2SVGLoaded(f) {
            s.group().transform("t" + [0, 205] + "s" + [1.7, 1]).append(f);

        }

        function onDesertForegroundLane3SVGLoaded(f) {
            s.group().transform("t" + [0, 325] + "s" + [1.7, 1]).append(f);

        }

        function onDesertForegroundLane4SVGLoaded(f) {
            s.group().transform("t" + [0, 450] + "s" + [1.7, 1.3]).append(f);

        }


        function onDesertBackgroundLane1SVGLoaded(f) {
            s.group().transform("t" + [0, 91] + "s" + [1.7, 1]).append(f);
        }

        function onDesertBackgroundLane2SVGLoaded(f) {
            s.group().transform("t" + [0, 216] + "s" + [1.7, 1]).append(f);
        }

        function onDesertBackgroundLane3SVGLoaded(f) {
            s.group().transform("t" + [0, 336] + "s" + [1.7, 1]).append(f);
        }

        function onDesertBackgroundLane4SVGLoaded(f) {
            s.group().transform("t" + [0, 460] + "s" + [1.7, 1.3]).append(f);
        }

        //add palmtree
        function onPalmThree1SVGLoaded(f) {
            s.group().transform("t" + [300, 31] + "s" + [0.1]).append(f);

        }

        function onPalmThree2SVGLoaded(f) {
            s.group().transform("t" + [150, 151] + "s" + [0.1]).append(f);

        }

        function onPalmThree3SVGLoaded(f) {
            s.group().transform("t" + [200, 257] + "s" + [0.1]).append(f);

        }

        function onPalmThree4SVGLoaded(f) {
            s.group().transform("t" + [250, 395] + "s" + [0.1]).append(f);

        }

    }


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
            if ($('chatInput').val() != "") {
                var ts = Date.now() / 1000;
                Messages.insert({
                        name: Session.get('Username'),
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

    /*
     ******************************************************************************************
     * All animation for the ballThrowLocation
     * @author: Ewout Merckx
     */

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
        // the snap object with width and height
        snapobj = Snap('#ballTrowLocation');
        ballFieldWidth = $('#ballTrowLocation').width();
        ballFieldHeight = $('#ballTrowLocation').height();

        // Shows the background of the ball throwing location
        showBackground();

        // we make all the holes
        holesArray = new Array();
        holesArray[0] = new Circle(ballFieldWidth / 2, 130, ballRadius + 4, '1');
        holesArray[1] = new Circle(ballFieldWidth / 2 - 2.5 * ballRadius, 105, ballRadius + 4, '1');
        holesArray[2] = new Circle(ballFieldWidth / 2 + 2.5 * ballRadius, 105, ballRadius + 4, '1');
        holesArray[3] = new Circle(ballFieldWidth / 2 - 5.5 * ballRadius, 25, ballRadius + 4, '2');
        holesArray[4] = new Circle(ballFieldWidth / 2 + 5.5 * ballRadius, 25, ballRadius + 4, '2');
        holesArray[5] = new Circle(ballFieldWidth / 2 - 2.75 * ballRadius, 25, ballRadius + 4, '3');
        holesArray[6] = new Circle(ballFieldWidth / 2 + 2.75 * ballRadius, 25, ballRadius + 4, '3');
        holesArray[7] = new Circle(ballFieldWidth / 2, 25, ballRadius + 4, '4');
        holesArray[8] = new Circle(ballFieldWidth / 2, 77.5, ballRadius + 4, '5');

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

        //adding the border line
        var line = snapobj.line(0, 500, ballFieldWidth, 500);
        line.attr({
            stroke: "#000",
            strokeWidth: 5
        });

        // we make the ball
        ball = snapobj.circle(ballFieldWidth / 2, 600, ballRadius);
        ball.attr({
            fill: 'r()#FF0000-#B30000',
            stroke: '#000',
            strokeWidth: '1'
        });

        // we make the canvas
        canvas = snapobj.rect(0, 500, ballFieldWidth, ballFieldHeight - 500)
        canvas.attr({
            fill: '#999',
            opacity: 0.0
        });

        // we add eventlisteners for when the mouse is hovering over the canvas
        // the ball can be dragged
        canvas.hover(hoverInCanvas, hoverOutCanvas);

        timer = setTimeout(throwBall, 100);

    }

    function showBackground() {
        // Makes the wooden background
        var counter = 0;
        var i;
        for (i = 0; i < ballFieldWidth; i += 15) {

            // If i is even, create an indent of -120
            // and make then pieces of wood
            var j;
            for ((i % 30 == 0 ? j = 0 : j = -120);
                 j < ballFieldHeight; j += 80) {
                var woodblock = snapobj.rect(i, j, 16, 80);
                var colour;
                switch (counter % 7) {
                    case 0:
                        colour = '#D7AD7B'
                        break;
                    case 1:
                        colour = '#D8B484'
                        break;
                    case 2:
                        colour = '#DEB879'
                        break;
                    case 3:
                        colour = '#D9B180'
                        break;
                    case 4:
                        colour = '#E1BC85'
                        break;
                    case 5:
                        colour = '#D7B182'
                        break;
                    case 6:
                        colour = '#DFBF82'
                        break;
                    default:
                        colour = '#000'
                }
                woodblock.attr({
                    fill: colour
                });
                counter++;
            }

            // We show dots beneath the line of the throwing area
            if (i > 0) {
                snapobj.circle(i, 515, 2);
                snapobj.circle(i, ballFieldHeight - 30, 2);
                snapobj.circle(i, ballFieldHeight - 50, 2);
            }
        }

        var spacearrow = ballFieldWidth / 8;
        var heightarrow = 500;
        var i;
        for (i = spacearrow; i <= ballFieldWidth - spacearrow; i += spacearrow) {
            if (ballFieldWidth / 2 >= i) {
                heightarrow -= 20;
            }
            else {
                heightarrow += 20;
            }
            snapobj.polygon([i - 5, heightarrow, i, heightarrow - 20, i + 5, heightarrow]);
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

    function hoverInCanvas() {
        // Eventlistener for when there is a click on the canvas
        canvas.mousedown(onMouseDown);
    }

    // Method for when the mouse is down
    function onMouseDown(mouseEvent) {
        // If the mouse is on the ball, then you can move the ball
        if (getDistance(mouseEvent.offsetX, mouseEvent.offsetY, ball.node.cx.baseVal.value, ball.node.cy.baseVal.value) <= ballRadius
            && mouseEvent.offsetY > 450) {
            isMouseDown = true;
            oldX = ball.node.cx.baseVal.value;
            oldY = ball.node.cy.baseVal.value;
            oldTime = 0;
            time = Date.now();

            // add additional event listeners for dragging
            canvas.mouseup(onMouseUp);
            canvas.mousemove(onMouseMove);
        }
    }

    // When the mouse hovers out of the canvas, removes al the eventlisteners
    // The ball will be thrown
    function hoverOutCanvas() {
        onMouseUp();
        canvas.unmousedown(onMouseDown);
    }

// the handler when the mouse is moving
    function onMouseMove(mouseEvent) {
        // we keep the time
        oldTime = time;
        time = Date.now();

        // we save the old position
        oldX = ball.node.cx.baseVal.value;
        oldY = ball.node.cy.baseVal.value;

        // we calculate delta time
        dTime = time - oldTime;

        // if dTime has a too low value, we set it to the minimum value
        if (dTime < 20) {
            dTime = 20;
        }

        // calculating the velocity
        vx = (mouseEvent.offsetX - oldX) / dTime;
        vy = (mouseEvent.offsetY - oldY) / dTime;

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
                var interval = 50;

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
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

// The ball goes to the middle of the hole
    function ballGoesInHole(hole) {
        console.log("Ball went into hole: " + hole.nr);
        //Get the current state of the game
        var tempGame = Games.findOne({}, {GameId: Session.get("GameId")});
        //Increase the current location
        tempGame.Players[Session.get("PlayerId")].CurrentLocation += parseInt(hole.nr) * 10;
        //Update the game in the DB
        Games.update(tempGame._id, tempGame);
        //Update the game on the client side
        //game = tempGame
        // console.log(game);

        //Reset the ball location
        ball.animate({cx: hole.middlepointX, cy: hole.middlepointY, r: 0}, 1000);
        setTimeout(resetBall, 1000);
    }

// Resets the ball
    function resetBall() {
        // the velocity of the ball
        vx = 0.001;
        vy = 0.1;

        // the ball is not above a hole
        isAboveHole = false;

        // position and radius of the ball
        ball.animate({cx: ballFieldWidth / 2, cy: 600}, 1);
        ball.animate({r: ballRadius}, 500);

        // animation of the ball
        setTimeout(throwBall, 600)
    }


    var moveCamels = function () {
        console.log("Camels are being moved");
        var camelArray = [camelBlue, camelGreen, camelRed, camelYellow];
        currentGame = Games.findOne({}, {GameId: Session.get("GameId")});
        $.each(camelArray, function (index) {
            this.animate({
                transform: "t" + [590 - currentGame.Players[index].CurrentLocation, ys[index]] + "s" + [0.25]
            }, parseInt(2000));
        });
    }


}

//events for moving camel on button click
//    Template.hello.events = {
//        'click #btnMoveCamel': function () {
//            //testing move
//            var speed = $("#txtboxSpeed").val();
//            var distance = $("#txtboxDistance").val();
//            // console.log(game.Players[1].Distance*10) ;
//            //var PlayerId = Session.get("PlayerId") ;
//
//            //var test = game.Players[PlayerId].Distance*10 ;
//
//
//            var camelArray = [camelBlue, camelGreen, camelRed, camelYellow];
//            /*            camelArray[PlayerId].animate({
//             transform: "t"+[currentLocationBlueX-test,blueY]+"s"+[0.25]
//             },parseInt(2000));
//             currentLocationBlueX = currentLocationBlueX - test ;*/
//
//            $.each(camelArray, function (index) {
//                this.animate({
//                    transform: "t" + [currentLocations[index] - game.Players[index].Distance * 10 , ys[index]] + "s" + [0.25]
//                }, parseInt(2000));
//                currentLocations[index] = currentLocations[index] - game.Players[index].Distance * 10;
//                console.log(this);
//                // this.an
//            });
//
//            //testing leg move
//
//            /* camelTest.animate({
//             transform: "t"+[currentLocationBlueX-distance,blueY]+"s"+[0.25]
//             },parseInt(speed));
//             //currentLocationBlueX = currentLocationBlueX - distance ;
//
//
//
//
//             camelGreen.animate({
//             transform: "t"+[currentLocationGreenX-distance,greenY]+"s"+[0.25]
//             },parseInt(speed));
//             currentLocationGreenX = currentLocationGreenX - distance ;
//
//             camelRed.animate({
//             transform: "t"+[currentLocationRedX-distance,redY]+"s"+[0.25]
//             },parseInt(speed));
//             currentLocationRedX = currentLocationRedX - distance ;
//
//             camelYellow.animate({
//             transform: "t"+[currentLocationYellowX-distance,yellowY]+"s"+[0.25]
//             },parseInt(speed));
//             currentLocationYellowX = currentLocationYellowX - distance ;*/
//
//        }
//    };



/*
******************************************************************************************
* Animation for the Home Page
* @author: Ewout Merckx
 */

//rendering field
Template.welcomeCamel.rendered = function () {

    // We create a new snap object
    var snapObj = Snap("#camelRunningBy");
    // We create a new group
    var welcomeCamel = snapObj.group();
    // A variable to keep the with of the running field
    var welcomeCamelFieldWidth = $('#camelRunningBy').width();
    // Initial value to check if all the images are loaded
    var imagesLoaded = 0, totalImages = 3;

    // loading each camel to function as a running welcome camel
    Snap.load("../img/runningCamel/camelBase.svg", onWelcomeCamelSVGLoaded);
    Snap.load("../img/runningCamel/camelRunning1.svg", onWelcomeCamelSVGLoaded);
    Snap.load("../img/runningCamel/camelRunning2.svg", onWelcomeCamelSVGLoaded);

    // Evenhandler when a camel is loaded
    function onWelcomeCamelSVGLoaded(f) {
        welcomeCamel.transform("t" + [0, 50] + "s" + [0.3, 0.3]).append(f);
        imagesLoaded++;

        // If all the camels are loaded, animate them
        if (imagesLoaded == totalImages){
            setTimeout(animateCamel, 500);
        }
    }

    //Animates the camels
    function animateCamel() {
        /*foreach(var i in welcomeCamel){
            console.log(i);
        }*/

        // Makes the camels move
        welcomeCamel.animate({
            transform: "t" + (welcomeCamelFieldWidth/2 - 50) + "s" + [0.3, 0.3]
        }, 5000);
    }




//             transform: "t"+[currentLocationGreenX-distance,greenY]+"s"+[0.25]
//             },parseInt(speed));
//             currentLocationGreenX = currentLocationGreenX - distance ;
    //welcomeCamel.select("circle:nth-child(2)").animate({r: 50}, 1000);
    //welcomeCamel.animate({cx: welcomeCamelFieldWidth / 2 }, 1000);




}




