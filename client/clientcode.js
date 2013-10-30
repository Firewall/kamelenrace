if (Meteor.isClient) {

  //var player_id = Players.insert({name: '', idle: false});

  /*Template.hello.greeting = function () {

    return "";
  };*/


  var player1Location ;


  Template.hello.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        console.log('Template onLoad');
        player1Location = $("#player1").offset()

    }
  }

  Meteor.setInterval(
      function () {
          var top = player1Location.top ;
          var left = player1Location.left - 0.1 ;

          console.log("clicked top : " + top + "left "+ left) ;
          // template data, if any, is available in 'this'
          $("#player1").offset({ top:top, left:left })

          player1Location = $("#player1").offset()



          if (typeof console !== 'undefined')
              console.log("You pressed the button");
      },10

  )

  Template.hello.events({
    'click input#1' : function () {
        var top = player1Location.top ;
        var left = player1Location.left - 50 ;

        console.log("clicked top : " + top + "left "+ left) ;
      // template data, if any, is available in 'this'
      $("#player1").offset({ top:top, left:left })

        player1Location = $("#player1").offset()



        if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }

  });

    Template.messages.messages = function(){
      return Messages.find({}, { sort: {time: 1} });
    };


    ////////// Helpers for in-place editing //////////

    // Returns an event_map key for attaching "ok/cancel" events to
    // a text input (given by selector)
    var okcancel_events = function (selector) {
        return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
    };

    // Creates an event handler for interpreting "escape", "return", and "blur"
    // on a text field and calling "ok" or "cancel" callbacks.
    var make_okcancel_handler = function (options) {
        var ok = options.ok || function () {};
        var cancel = options.cancel || function () {};

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

    Template.entry.events={};

    Template.entry.events[okcancel_events('#chatInput')] = make_okcancel_handler({
        ok:function (text,event){
            var nameEntry = document.getElementById('chatInput');
            if(nameEntry.value != ""){
                var ts = Date.now() / 1000 ;
                Messages.insert({
                    name: nameEntry.value,
                    message :text,
                    time : ts},
                    function(){
                        var elem = document.getElementById('chat');
                        elem.scrollTop = elem.scrollHeight;

                    });
                    event.target.value = "" ;

                }
            }
        })
}


