HomeLayout = React.createClass({
    props: {
        pageTitle: React.PropTypes.string.isRequired,
        contentForLayout: React.PropTypes.element.isRequired
    },

    getInitialState(){
        return {
        }
    },

    componentDidMount() {
        DocHead.addMeta({name: "viewport", content: "width=device-width, initial-scale=1.0"});
        DocHead.addLink({rel: "icon", type: "image/png", href: "/images/favicons/favicon.png"});
    },

    render() {
        return (
            <div id="main">
                <img src="/../images/logo-inverso.jpg" width />
                <h1 className="page-header t3">{this.props.pageTitle}</h1>
                {this.props.contentForLayout}
            </div>
        );
    }
});