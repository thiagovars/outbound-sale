FlowRouter.route("/", {
    name: "home",
    action() {
        ReactLayout.render(HomeLayout, {
            pageTitle: 'Vender! Vender! E Vender!',
            contentForLayout: <Home />
        });
    }
});

FlowRouter.route("/clientes/listar", {
    name: "clientes.listar",
    action (){
        ReactLayout.render(HomeLayout, {
            pageTitle: 'Lista de Clientes',
            contentForLayout: <ClientesListar />,
            voltar: '/'
        });
    }
});

FlowRouter.route("/clientes/inserir", {
    name: "clientes.inserir",
    action() {
        ReactLayout.render(HomeLayout, {
            pageTitle: 'Inserir Cliente',
            contentForLayout: <ClientesForm />,
            voltar: '/'
        });
    }
});

FlowRouter.route("/clientes/editar/:clientesId", {
    name: "clientes.editar",
    action(params, queryString) {
        ReactLayout.render(HomeLayout, {
            pageTitle: 'Editar Cliente',
            contentForLayout: <ClientesForm clientesId={params.clientesId} />,
            voltar: '/clientes/listar'
        });
    }
});