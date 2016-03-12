Meteor.publish('clientes', function() {
    return Clientes.find();
});

Meteor.publish('clientes.map.count', function() {
    return Clientes.find({
        $and:[
            {
                coordX: {$ne: null}, 
                coordY:{$ne:null}
            }, {
                coordX:{$ne:0},
                coordY:{$ne:0}
            }
        ]
    });
});