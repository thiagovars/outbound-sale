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
        let btnVoltar = (<a href={this.props.clientesId? "/clientes/listar" : "/"} className="btn btn-voltar btn-block"><i className="fa fa-chevron-left"></i> Voltar</a>);
        let btnAction = (
            <Row>
                <Col xs={6} md={6}>{btnVoltar}</Col>
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
                <form id="formClienteForm" method="post" onSubmit={this.salvarDados}>
                    <Grid fluid={true}>
                        <Row style={{marginBottom: '35px'}}>
                            <Col xs={6}>{btnVoltar}</Col>
                            {this.props.clientesId? 
                                <Col xs={6} style={{textAlign: 'right'}} >
                                    <a className="btn-excluir" href="#" onClick={this.excluirCadastro}><i className="fa fa-trash fa-2x" /></a>
                                </Col>
                            :
                                null
                            }
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="Nome da Empresa" name="empresa" defaultValue={this.data.cliente.empresa} placeholder="Empresa" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="Dona/Sócia (o)" name="responsavel" defaultValue={this.data.cliente.responsavel} placeholder="Responsável" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="Telefones" name="telefones" defaultValue={this.data.cliente.telefones} placeholder="Telefones" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="E-mail" name="email" defaultValue={this.data.cliente.email} placeholder="E-mail" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="text" label="Endereço" name="endereco" defaultValue={this.data.cliente.endereco} placeholder="Endereço" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="textarea" row="7" label="Observações" name="observacoes" defaultValue={this.data.cliente.observacoes} placeholder="Observações" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="textarea" row="10" label="Desafios Explícitos" name="desafios_explicitos" defaultValue={this.data.cliente.desafios_explicitos} placeholder="Desafios Explícitos" /> </Col>
                        </Row>
                        <Row>
                            <Col md={12}> <Input type="textarea" row="10" label="Desafios Implícitos" name="desafios_implicitos" defaultValue={this.data.cliente.desafios_implicitos} placeholder="Desafios Implícitos" /> </Col>
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