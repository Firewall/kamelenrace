if (Meteor.isServer) {

    Meteor.startup(function () {
//        Games.remove({});
//
//        Games.insert({
//            GameId: 5,
//            Players: [
//                {
//                    Username: "player1",
//                    PlayerId: 1,
//                    CurrentLocation: 0
//                },
//                {
//                    Username: "player2",
//                    PlayerId: 2,
//                    CurrentLocation: 0
//
//                },
//                {
//                    Username: "player3",
//                    PlayerId: 3,
//                    CurrentLocation: 0
//
//                },
//                {
//                    Username: "player4",
//                    PlayerId: 4,
//                    CurrentLocation: 0
//
//                }
//            ]
//        })

        //When the server is restarted we clear all the message (Needs to only be when we create a game)
        Messages.remove({});


        // code to run on server at startup

    });
}
