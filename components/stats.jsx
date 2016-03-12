Stats = React.createClass({
    props: {
        color: React.PropTypes.string,
        icon: React.PropTypes.string,
        value: React.PropTypes.number,
        urlLink: React.PropTypes.string
    },

    render(){
        var color = 'stats alert alert-'+this.props.color;
        var icon = 'stats-icon fa fa-4x fa-'+this.props.icon;
        var lnk_class = 'lnk alert-'+this.props.color;
        if(typeof this.props.urlLink == 'undefined'){
            this.props.urlLink = '#';
        }
        return (
            <div className={color}>
                {typeof this.props.urlLink != 'undefined'?
                        <a href={this.props.urlLink} className={lnk_class}><i className="fa fa-plus-circle fa-2x" /></a>
                    :
                        null
                }
                <i className={icon} />
                <span>{this.props.value}</span>
            </div>
        );
    }
});