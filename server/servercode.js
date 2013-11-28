if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages.remove({});


    // code to run on server at startup
  });
}
