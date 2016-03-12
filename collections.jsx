Clientes = new Meteor.Collection('clientes');

Meteor.methods({
    clientesInserir: function (dados){
        Clientes.insert({
            created: new Date(),
            empresa: dados.empresa,
            responsavel: dados.responsavel,
            telefones: dados.telefones
        });
    },

    clientesEditar: function (clientesId, dados){
        Clientes.update({
            _id: clientesId,
        },{
            $set: dados
        },{
            multi: false
        });
    },

    clientesExcluir: function (clientesId){
        dados = Clientes.findOne({_id: clientesId});
        Clientes.remove({_id: clientesId});
        return dados;
    }
});