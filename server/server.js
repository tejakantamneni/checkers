Meteor.startup(function () {
    var game = Games.findOne();
    if (!game) {
        console.log("no existing games, creating one now...");
        initiateNewGame("user-1", "user-2");
    }
});

function initiateNewGame(user1, user2) {
    var g = {
        player1 : user1,
        player2 : user2,
        current_player : user1,
        slots : []
    };
    var isWhite = true;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var s = {
                isWhite : isWhite,
                xPos : i,
                yPos : j,
            };
            if((i == 0 || i == 2) && ( j == 0 || j == 2 || j == 4 || j == 6)){
                s.coin = {
                    hasCoin : true,
                    isWhite : true,
                    isKing : false
                }
            }else if( (i == 1) && ( j == 1 || j == 3 || j == 5 || j == 7)){
                s.coin = {
                    hasCoin : true,
                    isWhite : true,
                    isKing : false
                }
            }else if( (i == 5 || i == 7) && ( j == 1 || j == 3 || j == 5 || j == 7)){
                s.coin = {
                    hasCoin : true,
                    isWhite : false,
                    isKing : false
                }
            }else if( (i == 6) && ( j == 0 || j == 2 || j == 4 || j == 6 )){
                s.coin = {
                    hasCoin : true,
                    isWhite : false,
                    isKing : false
                }
            }else {
                s.coin = {
                    hasCoin : false,
                    isWhite : false,
                    isKing : false
                }

            }
            g.slots.push(s);
            isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }
    Games.insert(g);
};

