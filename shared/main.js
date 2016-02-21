Meteor.methods({
    updateCoinPosition:function(xPos, yPos, newXPos, newYPos, isWhite, isKing){
        //console.log("updating coin [" + xPos + ", "+ yPos + "] -> [" + newXPos +", " + newYPos +"]")
        //Games.update(
        //    {_id: Games.findOne()._id, "slots.xPos": xPos, "slots.yPos" : yPos},
        //    {"$set": {'slots.$.coin.xPos': xPos + 1, 'slots.$.coin.yPos': yPos + 1}}
        //);
        //
        //Games.update(
        //    {_id: Games.findOne()._id, "slots.xPos": 2, "slots.yPos": 2},
        //    {"$set": {'slots.$.coin.isWhite': false}}
        //);

        var game = Games.findOne();

        isValidMove = validateMove(game, xPos, yPos, newXPos, newYPos);

        if(isValidMove){//TODO: how can we make this a transaction?
            Games.update(
                {_id: Games.findOne()._id, slots: { $elemMatch: { xPos: xPos , yPos: yPos } }},
                {"$set": {'slots.$.coin.hasCoin': false}}
            );
            Games.update(
                {_id: Games.findOne()._id, slots: { $elemMatch: { xPos: newXPos , yPos: newYPos } }},
                {"$set": {'slots.$.coin.hasCoin': true, 'slots.$.coin.isWhite': isWhite, 'slots.$.coin.isKing': isKing}}
            );
        }
    },
})

function validateMove(game, xPos, yPos, newXPos, newYPos) {
    var slots = game.slots;
    var currSlot = _.where(slots, {xPos: xPos,    yPos: yPos})[0];
    var newSlot = _.where(slots,  {xPos: newXPos, yPos: newYPos})[0];

    console.log("Moving coin from (" + xPos +", " + yPos + ") -> (" + newXPos + ", " + newYPos +")");
    //console.log(currSlot)
    //console.log(newSlot)

    //console.log("in validateMove, currSlot -" + currSlot + ", newSlot - " + newSlot)

    //check the obvious things (position should be with in 0-7 on x and y and we can't have any other coin  in dest position)
    if(newSlot.coin.hasCoin || !newSlot.isWhite || newSlot.xPos > 7 || newSlot.xPos < 0 || newSlot.yPos < 0 || newSlot.yPos > 7){
        return false;
    }
    var isJumping = !(Math.abs(xPos - newXPos) == 1) && (Math.abs(yPos - newYPos) == 1);

    //coins can only move diagnolly (whites should move only towards black and blacks should move only towards white)
    //white coin check
    if(currSlot.coin.isWhite && !currSlot.coin.isKing && !isJumping){
        return newXPos > xPos //&& (Math.abs(yPos - newYPos) == 1);
    }
    //for black
    if(!currSlot.coin.isWhite && !currSlot.coin.isKing && !isJumping){
        return newXPos < xPos //&& (Math.abs(yPos - newYPos) == 1);
    }

    ////Exceptional case for Kings
    //if(currSlot.coin.isKing && !isJumping){
    //    return xPos != newXPos && yPos != newYPos && (Math.abs(xPos - newXPos) == 1) && (Math.abs(yPos - newYPos) == 1);
    //}
    //TODO: Jumping

    return true;
}
