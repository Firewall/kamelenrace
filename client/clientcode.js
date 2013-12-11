if (Meteor.isClient) {


    //Routing
    Meteor.Router.add({
      '/': 'home',

      '/game/:_id': { to: 'game', and: function(id) {
            Session.set('gameId', id);
         }}
      ,
      '*': 'not_found'
    });


    //Home page JS
    Template.home.events({
      'click #btnSetUsername': function () {
          //Set the username in the session
          if($('#txtSetUsername').val() != ''){
              Session.set('Username', $('#txtSetUsername').val());
              //Remove previous h2 & link
              $('#txtSetUsername').siblings('h2').remove();
              $('#txtSetUsername').siblings('a').remove();
              //Display Username & Link
              $('#txtSetUsername').parent('p').append('<h2>Your username is ' + Session.get('Username') + '</h2><a href="/game/5">Go to game</a>');
          }
    }});



    //Game page JS

    //camel variabels

    //Y coord for camels

    var blueY = 0 ;
    var greenY = 120 ;
    var redY = 240 ;
    var yellowY = 370 ;

    //startlocations of camels
    var startLocationBlue = "t"+[590,blueY]+"s"+[0.25] ;
    var startLocationGreen = "t"+[590,greenY]+"s"+[0.25] ;
    var startLocationRed = "t"+[590,redY]+"s"+[0.25] ;
    var startLocationYellow = "t"+[590,yellowY]+"s"+[0.25] ;

    //current X coordinate of camel
    var currentLocationBlueX = 590 ;
    var currentLocationGreenX = 590 ;
    var currentLocationRedX = 590 ;
    var currentLocationYellowX = 590 ;


    //camel objects
    var camelBlue ;
    var camelTest

    var camelGreen ;
    var camelRed ;
    var camelYellow ;

    //rendering field
    Template.hello.rendered = function () {
        if (!this._rendered) {
            this._rendered = true;

            //creating field
            var s = Snap("#backgroundRaceField");

            //ading lanes
            var lane1 = s.line(0, 125, 700,125);
            var lane2 = s.line(0, 250, 700,250);
            var lane3 = s.line(0, 370, 700,370);

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
            Snap.load("../img/DesertForeground.svg", onDesertForegroundLane1SVGLoaded ) ;
            Snap.load("../img/DesertForeground.svg", onDesertForegroundLane2SVGLoaded ) ;
            Snap.load("../img/DesertForeground.svg", onDesertForegroundLane3SVGLoaded ) ;
            Snap.load("../img/DesertForeground.svg", onDesertForegroundLane4SVGLoaded ) ;

            //load palm tree's
            Snap.load("../img/Palm_Tree.svg", onPalmThree1SVGLoaded ) ;
            Snap.load("../img/Palm_Tree.svg", onPalmThree2SVGLoaded ) ;
            Snap.load("../img/Palm_Tree.svg", onPalmThree3SVGLoaded ) ;
            Snap.load("../img/Palm_Tree.svg", onPalmThree4SVGLoaded ) ;


            Snap.load("../img/BlueCamel.svg", onBlueCamelSVGLoaded ) ;
            Snap.load("../img/BlueCamel.svg", testing ) ;


            Snap.load("../img/GreenCamel.svg", onGreenCamelSVGLoaded ) ;
            Snap.load("../img/YellowCamel.svg", onYellowCamelSVGLoaded ) ;
            Snap.load("../img/RedCamel.svg", onRedCamelSVGLoaded ) ;

            Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane1SVGLoaded ) ;
            Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane2SVGLoaded ) ;
            Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane3SVGLoaded ) ;
            Snap.load("../img/DesertBackground.svg", onDesertBackgroundLane4SVGLoaded ) ;

            //handwriten Camelracing
            var paper1 = Snap();
            paper1.attr({
                backgroundColor:"red"
            })

            //Code voor CAMELRACING Text

            //var path = paper1.path('<svg xmlns="http://www.w3.org/2000/svg" width="612" height="792" viewBox="0, 0, 612, 792"><g stroke-width="3" stroke-linecap="round" fill="none"><path d="M227.898 205.645c9.345-2.205 18.655-5.434 28.602-6.145 15.723-1.123 32.656 19.896 16 31-21.567 14.378-51.678-2.644-39-28" stroke="#000"/><path d="M348.977 209.035c5.98 1.005 12.736.785 16.523 6.465 2.639 3.958 1 13.752 1 18 0 53.33-62.295-26-18-26" stroke="#000"/><path d="M271.07 268.594c1.682 24.559 11.359 37.977 32.43 16.906" stroke="#000"/><path d="M236.336 303.59c22.07 8.407 40.317 11.526 63.164 3.91" stroke="#000"/><path d="M235.16 305.023c21.892 13.195 44.064 35.89 64.34 5.477" stroke="#000"/><path d="M222.207 287.938c1.745 18.821.613 42.622 10.293 59.562 3.899 6.823 11.16 10.192 16 16 2.45 2.94 4.448 10.483 9 12 3.609 1.203 4.336-5.336 6-7 8.001-8.001 19.443-11.443 28-20 14.818-14.818 34.424-25.107 51-38 22.628-17.6 63.734-87.533 49-117-20.664-41.327-44.485-33.186-83-38-17.857-2.232-42.126-12.864-61-5-13.925 5.802-28.358 27.073-33 41-16.631 49.892 10 70.987 10 114" stroke="#000"/><path d="M234.598 354.195c2.828 26.948-11.896 48.7-20.098 73.305" stroke="#000"/><path d="M277.727 358.191c-3.237 13.603 3.013 23.029 6.773 34.309" stroke="#000"/><path d="M281.16 384.844c35.333-2.296 71.845 17.414 91.34 46.656" stroke="#000"/><path d="M228.859 395.32c-23.976 8.344-60.475 9.825-80.359 28.18-4.556 4.206-6.939 10.314-11 15-7.47 8.62-13.679 13.198-18 24-1.384 3.46-2 14.727-2 11v-5" stroke="#000"/><path d="M211.164 196.125c-2.415 1.772-7.533-1.223-9.664.375-1.53 1.147-3.948 59.052-3 60 3.671 3.671 12.479-.826 16-2" stroke="#000"/><path d="M393.191 221.207c2.132 1.452 5.218-.961 7.309.293 3.663 2.198-11.37 64.79-18 67-5.103 1.701-10.686-7.529-13-11" stroke="#000"/><path d="M349.98 223.035c-2.877 14.76 2.52-16.554 2.52 5.465 0 4.164-18.662-9-2-9" stroke="#000"/><path d="M250.902 214.777c-3.059 1.869 2.063 12.258 4.598 9.723l-1-7c.686-.686 13.02-1.02 9 3-3.622 3.622-6.23-14.31-10-3-1.628 4.884 1.962 11.057 6 5" stroke="#000"/><path d="M330.59 196.125c10.659 2.187 22.559-2.075 32.91 1.375" stroke="#000"/><path d="M282.246 195.691c-12.226.837-21.529-6.452-32.746-10.191" stroke="#000"/><path d="M200.297 238.906c-9.701-2.567-15.171 4.828-22.797 9.594-18.835 11.772-8.657 45.61 19 41 14.715-2.452 22.053-38.649 6-44" stroke="#0000D1"/><path d="M384.539 266.945c23.226-1.941 24.826 43.933 4.961 50.555-17.075 5.692-35.128-29.581-3-51" stroke="#0000D1"/><path d="M273.379 320.066c-20.603 6.129 15.989 21.236 2.121.434" stroke="#0000D1"/></g></svg>');
            var path = paper1.path('<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="960px" height="560px" viewBox="0 0 960 560" enable-background="new 0 0 960 560" xml:space="preserve">' +
                '<path d="M142.757,172.705c-6.817-3.798-14.9-8.083-22.999-6.569c-8.452,1.58-15.873,7.851-21.652,13.951c-10.838,11.44-14.839,29.09-12.31,44.41c2.701,16.364,18.326,21.75,33.036,22.523c8.993,0.472,17.086-2.068,24.62-6.887c7.673-4.908,13.979-11.622,21.806-16.339c1.654-0.997,0.147-3.592-1.514-2.59c-12.252,7.384-21.577,19.667-36.279,22.406c-14.508,2.703-33.804-1.958-38.263-17.601c-3.687-12.936,0.293-29.223,7.86-39.966c4.477-6.356,11.25-11.873,18.12-15.401c8.755-4.496,18.357,0.361,26.061,4.653C142.934,176.238,144.447,173.646,142.757,172.705L142.757,172.705z"/>' +
                '<path d="M221,193.5c-14.868-0.801-29.285,7.748-36.781,20.398c-4.385,7.4-11.446,23.122-2.232,29.809c12.07,8.761,27.948,1.521,35.37-9.471c7.361-10.901,15.202-28.325,5.204-39.796c-1.072-1.229-2.761,0.109-2.507,1.459c3.147,16.731,8.767,32.969,9.446,50.101c0.076,1.928,3.077,1.935,3,0c-0.69-17.405-6.356-33.9-9.554-50.899c-0.836,0.486-1.671,0.973-2.507,1.459c8.714,9.998,1.09,23.959-4.235,33.682c-3.219,5.879-7.856,10.52-14.179,12.939c-5.721,2.188-14.237,1.769-18.946-2.486c-6.999-6.325,1.015-20.922,4.743-26.959C194.6,202.76,208.196,195.81,221,196.5C222.934,196.604,222.924,193.604,221,193.5L221,193.5z"/>' +
                'M247.5,247.5c-0.068-18.68-1.919-37.313-1.5-56c0.043-1.936-2.957-1.932-3,0c-0.419,18.687,1.432,37.32,1.5,56            C244.507,249.434,247.507,249.435,247.5,247.5L247.5,247.5z"/>' +
                '<path d="M247.061,219.561c7.66-5.999,24.201-25.777,34.592-15.28c5.234,5.288,6.622,14.263,7.38,21.311            c0.746,6.937,0.606,14.117-0.479,21.01c-0.298,1.892,2.593,2.704,2.893,0.798c2.235-14.198,2.512-34.949-8.386-45.959c-11.593-11.712-29.929,9.584-38.121,16C243.417,218.631,245.556,220.739,247.061,219.561L247.061,219.561z"/>' +
                +'<path d="M247.061,219.561c7.66-5.999,24.201-25.777,34.592-15.28c5.234,5.288,6.622,14.263,7.38,21.311            c0.746,6.937,0.606,14.117-0.479,21.01c-0.298,1.892,2.593,2.704,2.893,0.798c2.235-14.198,2.512-34.949-8.386-45.959c-11.593-11.712-29.929,9.584-38.121,16C243.417,218.631,245.556,220.739,247.061,219.561L247.061,219.561z"/>'
                +'<path d="M289.561,215.061c5.319-5.613,11.246-10.104,18.427-13.057c4.586-1.886,13.045-6.792,18.052-4.59            c3.89,1.711,4.099,9.477,4.445,12.882c0.425,4.173,0.344,8.401,0.292,12.588c-0.103,8.424-0.303,16.786,1.776,25.015c0.474,1.875,3.367,1.079,2.893-0.798c-2.749-10.883-1.367-22.136-1.732-33.228c-0.201-6.114-0.326-16.485-6.976-19.409c-5.599-2.462-13.003,2.325-18.115,4.104c-8.281,2.882-15.204,8.06-21.185,14.372C286.11,214.342,288.228,216.467,289.561,215.061L289.561,215.061z"/>'
                +'<path d="M349,217.5c11.947-0.14,24.379-1.674,36.207-3.332c5.721-0.802,14.187-3.518,16.819-9.253            c2.914-6.347-6.914-9.612-11.106-10.771c-8.043-2.225-16.241-2.736-23.627,1.646c-3.657,2.17-6.526,5.471-9.224,8.686            c-3.23,3.849-6.689,7.352-9.103,11.806c-4.382,8.085-0.342,17.118,4.774,23.778c5.323,6.929,14.07,9.33,22.466,8.182            c10.307-1.409,19.123-8.982,27.552-14.448c1.616-1.048,0.114-3.647-1.514-2.59c-12.291,7.971-29.049,21.778-43.508,9.842            c-5.656-4.669-10.024-13.69-8.113-20.947c1.037-3.937,4.146-7.323,6.743-10.297c2.524-2.891,4.952-5.887,7.724-8.544            c5.447-5.219,12.237-6.541,19.501-5.446c4.804,0.724,20.507,4.315,12.167,10.752c-5.65,4.361-12.984,4.735-19.76,5.331            c-9.357,0.822-18.58,2.494-27.998,2.604C347.067,214.523,347.065,217.523,349,217.5L349,217.5z"/>'
                +'<path d="M417.554,165.899c5.214,26.595,5.934,53.582,5.946,80.601c0.001,1.935,3.001,1.935,3,0            c-0.012-27.29-0.788-54.542-6.054-81.399C420.074,163.204,417.183,164.009,417.554,165.899L417.554,165.899z"/>'
                +'<path d="M438.054,191.399c2.6,19.291,6.921,38.288,10,57.5c0.305,1.906,3.196,1.094,2.893-0.798c-3.079-19.212-7.4-38.209-10-57.5C440.689,188.692,437.799,189.508,438.054,191.399L438.054,191.399z"/>'
                +'<path d="M445.061,213.561c13.1-15.075,33.425-18.472,52.439-18.561c1.934-0.009,1.935-3.009,0-3            c-19.766,0.093-40.96,3.789-54.561,19.439C441.677,212.892,443.789,215.023,445.061,213.561L445.061,213.561z"/>'
                +'<path d="M558,194c-8.373-0.049-17.118-1.158-24.717,3.104c-7.5,4.207-12.621,14.507-16.266,21.889            c-4.555,9.225-7.166,26.353,7.352,26.985c11.553,0.503,23.302-9.207,30.361-17.342c8.582-9.89,12.904-22.848,6.064-34.892            c-0.792-1.394-2.66-0.646-2.795,0.757c-1.73,17.897,7.21,34.665,6.5,52.5c-0.077,1.935,2.923,1.928,3,0            c0.711-17.841-8.228-34.626-6.5-52.5c-0.932,0.252-1.863,0.505-2.795,0.757c11.262,19.83-11.791,43.853-30.767,47.487            c-3.711,0.711-7.738,0.052-9.89-3.314c-4.097-6.408,0.382-15.784,3.427-21.614c3.524-6.746,8.098-14.911,14.889-18.72            c6.402-3.591,15.133-2.138,22.137-2.097C559.935,197.011,559.934,194.011,558,194L558,194z"/>'
                +'<path d="M634.446,201.601c-3.271-10.346-17.373-7.325-24.966-4.73c-11.736,4.012-24.52,12.278-29.618,24.036            c-2.158,4.977-2.131,10.349,0.132,15.269c3.058,6.649,11.459,9.086,18.019,10.168c7.434,1.226,15.426,1.179,22.869,0.082            c5.456-0.804,10.65-2.992,15.638-5.255c4.888-2.218,10.277-4.402,14.738-7.376c1.601-1.067,0.101-3.667-1.514-2.59            c-6.829,4.553-15.594,8.215-23.356,10.791c-7.096,2.355-14.805,2.398-22.207,2.002c-6.747-0.361-14.391-1.601-19.485-6.413            c-4.346-4.105-4.11-10.856-1.912-15.928c4.318-9.959,15.198-16.86,24.824-20.879c5.85-2.443,21.068-7.482,23.946,1.62            C632.135,204.236,635.031,203.451,634.446,201.601L634.446,201.601z"/>' +
                '<path d="M665,193.5c0.926,17.308-0.33,34.676,2.054,51.899c0.264,1.909,3.154,1.094,2.893-0.798            c-2.344-16.942-1.036-34.074-1.946-51.101C667.897,191.576,664.897,191.566,665,193.5L665,193.5z"/>' +
                '<path d="M660.554,169.101c-0.782,3.271-0.026,6.666,3.036,8.44c2.718,1.576,6.265,0.75,8.203-1.632            c2.185-2.685,2.22-7.352-0.862-9.41c-2.909-1.943-6.705-1.007-8.99,1.44c-1.319,1.412,0.798,3.538,2.121,2.121            c1.209-1.294,3.068-2.115,4.795-1.314c2.017,0.936,1.801,3.83,0.586,5.323c-1.057,1.299-2.865,1.616-4.339,0.881            c-1.916-0.955-2.101-3.197-1.657-5.052C663.896,168.018,661.004,167.22,660.554,169.101L660.554,169.101z"/>' +
                '<path d="M689.5,246.5c0.043-9.577,0.646-19.144,0.336-28.723c-0.314-9.691-3.63-19.11-3.336-28.777c0.059-1.936-2.941-1.93-3,0            c-0.295,9.677,2.883,19.109,3.336,28.777c0.448,9.564-0.293,19.156-0.336,28.723C686.491,248.435,689.491,248.434,689.5,246.5            L689.5,246.5z"/>' +
                '<path d="M687.757,209.795c5.456-3.83,11.142-7.32,17.104-10.307c6.012-3.012,15.211-7.323,21.879-3.989            c7.677,3.839,6.754,18.51,6.537,25.472c-0.279,8.955-1.639,18.008-0.224,26.927c0.303,1.907,3.193,1.094,2.893-0.798            c-1.658-10.448,0.48-21.285,0.405-31.798c-0.053-7.499-1.03-18.011-8.097-22.394c-5.971-3.703-14.871-0.457-20.614,2.02            c-7.568,3.264-14.661,7.546-21.398,12.275C684.673,208.307,686.17,210.91,687.757,209.795L687.757,209.795z"/>'+
                '<path d="M798.5,211.5c-0.573,5.997-2.247,11.844-5.276,17.069c-3.638,6.274-10.365,7.711-16.804,9.573            c-6.166,1.783-17.176,6.439-22.718,1.069c-3.413-3.307-0.798-10.594,0.985-14.005c2.655-5.079,7.163-9.244,11.407-12.987            c5.946-5.243,18.471-16.864,26.553-9.827c6.172,5.374,7.229,16.525,7.853,24.108c1.062,12.9,1.944,25.807,1.187,38.752            c-0.533,9.113-1.554,23.323-8.606,30.217c-3.604,3.523-9.691,3.369-14.329,3.63c-7.235,0.407-14.512-0.064-21.752-0.098            c-1.935-0.009-1.934,2.991,0,3c11.072,0.052,24.722,2.428,35.15-2.313c7.388-3.359,9.405-13.894,10.852-20.899            c2.765-13.394,2.233-27.429,1.372-40.99c-0.627-9.87-1.016-20.165-4.583-29.507c-2.345-6.142-7.354-12.326-14.674-11.078            c-9.513,1.621-18.776,10.335-25.403,16.843c-6.169,6.059-12.364,14.858-10.004,23.998c1.67,6.466,9.744,6.82,15.071,6.075            c8.133-1.138,17.658-3.532,24.801-7.564c8.197-4.627,11.096-16.469,11.917-25.064C801.684,209.574,798.682,209.592,798.5,211.5            L798.5,211.5z"/>')

            path.attr({
                //visibility:hidden
            })
            var pathString = path.getSubpath().end;
            var pathArray = pathString.split('M');

            var g = paper1.group();
            g.transform("t"+[0,100] +"s1");

            var raphPathArray = [];
            for( var a=0; a<pathArray.length; a++) {
                setTimeout( animStep, a*100 );
            };

            var index = 0;
            function animStep () {
                index++;

                raphPathArray[ index ] = paper1.path('M'+pathArray[index]);
                var leng = raphPathArray[ index ].getTotalLength();


                raphPathArray[ index ].attr({
                    stroke: 'blue',
                    strokeWidth: 4,
                    fill: 'none',
                    "stroke-dasharray": leng + " " + leng,
                    "stroke-dashoffset": leng
                }).animate({"stroke-dashoffset": 0}, 900,mina.elastic());

                g.append( raphPathArray[index] );

            }

            var len = path.getTotalLength();

            path.attr({
                visibility:'hidden'
            });

            //functions for adding camels to field + scaling svg
            function onBlueCamelSVGLoaded( f ){
                camelBlue = s.group().transform(startLocationBlue).append( f );
                camelBlue.attr({
                 //   stroke: "#000",
                 //   strokeWidth: 2
                });

            }
            function testing( f ){
                camelTest = s.group().transform("t"+[510,0]+"s"+[0.25]).attr({visibility:'hidden'}).append( f );
                camelTest.attr({
                    //visibility:'hidden'
                });
            }

            function onGreenCamelSVGLoaded( f ){
                camelGreen = s.group().transform(startLocationGreen).append( f );
            }

            function onYellowCamelSVGLoaded( f ){
                camelYellow = s.group().transform(startLocationYellow).append( f );
            }

            function onRedCamelSVGLoaded( f ){
                camelRed = s.group().transform(startLocationRed).append( f );
            }

            //adding desert foreground and backgrounds
            function onDesertForegroundLane1SVGLoaded( f ){
                s.group().transform("t"+[0,81]+ "s"+[1.7,1]).append( f );

            }
            function onDesertForegroundLane2SVGLoaded( f ){
                s.group().transform("t"+[0,205]+ "s"+[1.7,1]).append( f );

            }
            function onDesertForegroundLane3SVGLoaded( f ){
                s.group().transform("t"+[0,325]+ "s"+[1.7,1]).append( f );

            }
            function onDesertForegroundLane4SVGLoaded( f ){
                s.group().transform("t"+[0,450]+ "s"+[1.7,1.3]).append( f );

            }


            function onDesertBackgroundLane1SVGLoaded( f ){
                s.group().transform("t"+[0,91]+ "s"+[1.7,1]).append( f );
            }
            function onDesertBackgroundLane2SVGLoaded( f ){
                s.group().transform("t"+[0,216]+ "s"+[1.7,1]).append( f );
            }
            function onDesertBackgroundLane3SVGLoaded( f ){
                s.group().transform("t"+[0,336]+ "s"+[1.7,1]).append( f );
            }
            function onDesertBackgroundLane4SVGLoaded( f ){
                s.group().transform("t"+[0,460]+ "s"+[1.7,1.3]).append( f );
            }

            //add palmtree
            function onPalmThree1SVGLoaded( f ){
                s.group().transform("t"+[300,31]+ "s"+[0.1]).append( f );

            }
            function onPalmThree2SVGLoaded( f ){
                s.group().transform("t"+[150,151]+ "s"+[0.1]).append( f );

            }
            function onPalmThree3SVGLoaded( f ){
                s.group().transform("t"+[200,257]+ "s"+[0.1]).append( f );

            }
            function onPalmThree4SVGLoaded( f ){
                s.group().transform("t"+[250,395]+ "s"+[0.1]).append( f );

            }




        }


    }

    //events for moving camel on button click
    Template.hello.events = {
        'click #btnMoveCamel': function(){
            //testing move
            var speed = $("#txtboxSpeed").val();
            var distance = $("#txtboxDistance").val();



            camelBlue.animate({
                       transform: "t"+[currentLocationBlueX-distance,blueY]+"s"+[0.25]
                 },parseInt(speed));
            currentLocationBlueX = currentLocationBlueX - distance ;

            //testing leg move

            camelTest.animate({
                transform: "t"+[currentLocationBlueX-distance,blueY]+"s"+[0.25]
            },parseInt(speed));
            //currentLocationBlueX = currentLocationBlueX - distance ;




            camelGreen.animate({
                transform: "t"+[currentLocationGreenX-distance,greenY]+"s"+[0.25]
            },parseInt(speed));
            currentLocationGreenX = currentLocationGreenX - distance ;

            camelRed.animate({
                transform: "t"+[currentLocationRedX-distance,redY]+"s"+[0.25]
            },parseInt(speed));
            currentLocationRedX = currentLocationRedX - distance ;

            camelYellow.animate({
                transform: "t"+[currentLocationYellowX-distance,yellowY]+"s"+[0.25]
            },parseInt(speed));
            currentLocationYellowX = currentLocationYellowX - distance ;

        }
    };

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




