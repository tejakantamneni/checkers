
Template.game.helpers({
    game: function(){
        return Games.findOne();
    }
});

Template.game.events({
    "click .coin": function(event){
        //console.log(this);
        //console.log("updating coin [" + this.xPos + ", "+ this.yPos + ", " + this.coin.isWhite + ", " + this.coin.isKing +"]")
        if(!Session.get("sel-coin") && this.coin.hasCoin){//choosing a coin to move
            Session.set("sel-coin", this);
            $(event.target).addClass("red-border");
        }else if(Session.get("sel-coin") && !this.coin.hasCoin){
            var sel = Session.get("sel-coin");
            Meteor.call("updateCoinPosition", sel.xPos, sel.yPos, this.xPos, this.yPos, sel.coin.isWhite, sel.coin.isKing )
            //delete selection from session and clear decoration
            delete Session.keys['sel-coin']
            $('.container .coin').removeClass("red-border");
        }else if(Session.get("sel-coin")){
            var sel = Session.get("sel-coin");
            if(sel.xPos == this.xPos && sel.yPos == this.yPos){
                delete Session.keys['sel-coin']
                $('.container .coin').removeClass("red-border");
                return;
            }
        }

        //console.log("updating coin [" + this.xPos + ", "+ this.yPos + ", " + this.coin.isWhite + ", " + this.coin.isKing +"]")
        //Meteor.call("updateCoinPosition", this.xPos, this.yPos, this.xPos, this.yPos + 1, this.coin.isWhite, this.coin.isKing )

    }
});

Template.registerHelper('shouldStartNewRow', function(v1) {
   return v1 % 8 == 0;
});

Template.registerHelper('getCoinIcon', function(isWhiteCoin, isKing) {
   if(isWhiteCoin){
       if(isKing){ return "white-king.png"}else{ return "white.png"}
   }else if (!isWhiteCoin){
       if(isKing){ return "black-king.png"}else{ return "black.png"}
   }
});


//db.games.aggregate({$unwind: '$slots'}, {$sort: {'xPos': -1, 'yPos':-1}}, {$group: {_id:"$_id", slots: {$push:"$slots"}}})
//
/*

 db.games.aggregate({$unwind: '$slots'}, {$sort: {'xPos': -1, 'yPos':-1}, {$group: {_id:"$_id", slots: {$push:"$slots"}}})


 */
