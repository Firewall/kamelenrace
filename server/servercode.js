if (Meteor.isServer) {

  Meteor.startup(function () {

    //When the server is restarted we clear all the message (Needs to only be when we create a game)
    Messages.remove({});


    // code to run on server at startup

  });
}
