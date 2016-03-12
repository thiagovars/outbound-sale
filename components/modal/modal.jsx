Modal = React.createClass({
    props: {
        title: React.PropTypes.string,
        content: React.PropTypes.element
    },

    getInitialState(){
        return {
        }
    },

    load(content){
        // this.props.content = content;
        this.setProps({content: content});
alert('executou "this.load"');
console.log(this.props);
// this.forceUpdate();
this.show();
    },

    show(){
        $('#aviso-modal').modal('show');
        this._center();
    },

    eventClose(){

    },

    render(){
        if(!this.props.title){
            this.props.title = 'Aguarde';
        }

        if(!this.props.content){
            this.props.content = <p><span className='loaders'>Carregando...</span></p>;
        }

        // this.setState({contentLoaded: false});

        return (
            <div className="modal fade" id="aviso-modal" style={{display:'none'}}>
                <div className="modal-header">
                    <div className="close" data-dismiss="modal">&times;</div>
                    <h3>{this.props.title}</h3>
                </div>
                <div className="modal-body" id="aviso-modal-body">
                    {this.props.content}
                </div>
                <div className="modal-footer">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <div className="span5 footer-lnk"></div>
                            <div className="span7 footer-btn">
                                <button onclick={this.eventClose} className="btn">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },


    _center: function(){
        var windowWidth = $(window).width();

        // calcula posição automaticamente
        if(windowWidth <480){
            maxWidth = (windowWidth - 20);
        } else 
        if(windowWidth <600){
            maxWidth = (windowWidth - 20);
        } else
        if(windowWidth <767){
            maxWidth = (windowWidth - 20);
        } else 
        if(windowWidth >=767){
            maxWidth = (windowWidth - 20);
        }

        maxWidth = Math.min(maxWidth, 560);
        var left = (windowWidth - maxWidth)/2;

        $('#aviso-modal').css({
            width: maxWidth+'px',
            left: left+'px',
            margin: '0',
            paddingLeft: 0
        });

        $('#aviso-modal .modal-body').css({'maxHeight': ($(window).height() - 194)+'px'});
    }
})

ModalObj = {
    load: function (conteudo){
        ReactDOM.render(conteudo, document.getElementById('aviso-modal-body'));
        this.show();
    },

    setTitle: function (titulo){
        $('#aviso-modal .modal-header h3:eq(0)').text(titulo);
    },

    show: function (){
        $('#aviso-modal').modal('show');
        this._center();
    },

    hide: function (){
        $('#aviso-modal').modal('hide');
    },

    close: function (){
        $('#aviso-modal').modal('close');
    },

    _center: function(){
        var windowWidth = $(window).width();

        // calcula posição automaticamente
        if(windowWidth <480){
            maxWidth = (windowWidth - 20);
        } else 
        if(windowWidth <600){
            maxWidth = (windowWidth - 20);
        } else
        if(windowWidth <767){
            maxWidth = (windowWidth - 20);
        } else 
        if(windowWidth >=767){
            maxWidth = (windowWidth - 20);
        }

        maxWidth = Math.min(maxWidth, 560);
        var left = (windowWidth - maxWidth)/2;

        $('#aviso-modal').css({
            width: maxWidth+'px',
            left: left+'px',
            margin: '0',
            paddingLeft: 0
        });

        $('#aviso-modal .modal-body').css({'maxHeight': ($(window).height() - 194)+'px'});
    }
};