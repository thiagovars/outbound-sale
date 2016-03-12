Home = React.createClass({
    mixins: [ReactMeteorData],
 
    getInitialState() {
        return {
        }
    },

    getMeteorData() {
        var data = {
            clientesCount: 0,
            clientesMap: 0,
        };

        var count = Meteor.subscribe('clientes');
        if(count.ready()){
            data.clientesCount = Clientes.find().count();
        }
        var map = Meteor.subscribe('clientes.map.count');
        if(map.ready()){
            data.clientesMap = Clientes.find({
                $and:[
                    {
                        coordX: {$ne: null}, 
                        coordY:{$ne:null}
                    }, {
                        coordX:{$ne:0},
                        coordY:{$ne:0}
                    }
                ]
            }).count();
        }

        return data;
    },

    listarClientes(){
        FlowRouter.go('/clientes/listar');
    },

    exibirMapa(){
        alert('Não implementado');
    },

    render() {
        return (
            <div className='page-home'>
                <div className="panel panel-default">
                    <div className="panel-body">Muito bem-vindo meu camarada. <br /><strong>Bora vender?</strong></div>
                </div>

                <Grid fluid={true}>
                    <Row>
                        <Col xs={6} md={6}>
                            <div onClick={this.listarClientes}>
                                <Stats color="info" icon="users" value={this.data.clientesCount} urlLink="/clientes/inserir" />
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div onClick={this.exibirMapa}>
                                <Stats color="warning" icon="map-marker" value={this.data.clientesMap} />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});