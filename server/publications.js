
//Games subscription
Meteor.publish("games", function(){
    return Games.find();
    //return Games.aggregate({$unwind: '$slots'}, {$sort: {'xPos': -1, 'yPos':-1}}, {$group: {_id:"$_id", slots: {$push:"$slots"}}});
});