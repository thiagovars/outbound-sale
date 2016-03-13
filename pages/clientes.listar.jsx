ClientesListar = React.createClass({
    mixins: [ReactMeteorData],
 
    getInitialState() {
        return {
        }
    },

    getMeteorData() {
        var stats = Meteor.subscribe('clientes');
        if(stats.ready()){
            return {clientes: Clientes.find().fetch()};
        } else {
            return {clientes: []}
        }
    },

    editarCliente(cliente){
        FlowRouter.go('/clientes/editar/'+cliente._id);
    },

    render(){

        let btnAction = (<a href="/" className="btn btn-voltar btn-block"><i className="fa fa-chevron-left"></i> Voltar</a>);

        return (
            <div className="page-clientes-inserir">
                <Grid>
                    <Row style={{marginBottom: '35px'}}>
                        <Col xs={6}>{btnAction}</Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table striped bordered responsive>
                                <thead>
                                    <tr>
                                        <th>Salão</th>
                                        <th>Dona/Sócia (o)</th>
                                        <th>Telefones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.data.clientes.map((cliente) => {
                                        return (
                                            <tr key={cliente._id} onClick={() => { this.editarCliente(cliente)}}>
                                                <td>{cliente.empresa}</td>
                                                <td>{cliente.responsavel}</td>
                                                <td>{cliente.telefones}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>{btnAction}</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
})