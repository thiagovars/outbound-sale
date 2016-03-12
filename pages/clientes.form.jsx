ClientesForm = React.createClass({
    mixins: [ReactMeteorData],
    props: {
        clientesId: React.PropTypes.string
    },
 
    getInitialState() {
        return {
        }
    },

    getMeteorData() {
        if(this.props.clientesId){
            var stats = Meteor.subscribe('clientes');
            if(stats.ready()){
                return {
                    cliente: Clientes.findOne({_id: this.props.clientesId})
                };
            }
        }

        return {
            cliente: {
                empresa: '',
                responsavel: '',
                telefones: ''
            }
        };
    },

    getInitialState(){
        return {
            erro: '',
            sucesso: '',
            exibeAviso: false
        }
    },

    salvarDados(event) {
        event.preventDefault();

        post = ReactForm.array2json($('#formClienteForm').serializeArray());

        if(this.props.clientesId){
            Meteor.call('clientesEditar', this.props.clientesId, post);
        } else {
            Meteor.call('clientesInserir', post);

            $('#formClienteForm :input').each(function (){
                $(this).val('');
            });
            $('#formClienteForm :input[name=empresa]').focus();
        }

        this.setState({
            erro: '',
            sucesso: 'Cliente salvo com sucesso.',
            exibeAviso: true
        });
    },

    excluirCadastro(event) {
        event.preventDefault();

        if(confirm('Deseja mesmo excluir cadastro?')){
            this.data.cliente = Meteor.call('clientesExcluir', this.props.clientesId);
            $('#formClienteForm :input, .btn').attr('disabled',true);
            FlowRouter.go('/clientes/listar');
        }
    },

    render() {
        let btnAction = (
            <Row>
                <Col xs={6} md={6}><a href="/" className="btn btn-voltar btn-block"><i className="fa fa-chevron-left"></i> Voltar</a></Col>
                <Col xs={6} md={6}><Input type="submit" value="Salvar" className="btn-salvar btn-block" /></Col>
            </Row>
        );

        return (
            <div className="page-clientes-form">
                {this.state.exibeAviso?
                    <Alert bsStyle={this.state.erro!=''? 'danger' : 'success'}>{this.state.erro!=''? this.state.erro : this.state.sucesso}</Alert>
                :
                    null
                }
                {this.props.clientesId? 
                    <a className="btn-excluir" href="#" onClick={this.excluirCadastro}><i className="fa fa-trash fa-2x" /></a>
                :
                    null
                }
                <form id="formClienteForm" method="post" onSubmit={this.salvarDados}>
                    <Grid fluid={true}>
                        <Row>
                            <Col md={12}> <Input type="text" label="Nome da Empresa" name="empresa" defaultValue={this.data.cliente.empresa} placeholder="Empresa" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="Dona/Sócia (o)" name="responsavel" defaultValue={this.data.cliente.responsavel} placeholder="Responsável" /> </Col>
                        </Row>
                        <Row>
                            <Col md={8}> <Input type="text" label="Telefones" name="telefones" defaultValue={this.data.cliente.telefones} placeholder="Telefones" /> </Col>
                        </Row>
                        {btnAction}
                    </Grid>
                </form>
            </div>
        );
    },

    componentDidMount(){
        $('#formClienteForm :input[name=empresa]').focus();
        $('#formClienteForm :input[name=telefones]').mask('(99) 9999-9999?9');
    }
});