import React from 'react';

/**
 * Dialog header
 */

class DialogHeader extends React.Component{
    constructor(){
        super();
        this.closeDialog = this.closeDialog.bind(this);
    }
    componentWillMount = ()=>{
        console.log(this.props, 'this.props');
    }
    closeDialog = (e)=>{
        this.props.closeDialog(e);
    }
    render(){
        return (
            <div className={this.props.className}>
                <strong>{this.props.headerConfig.title}</strong>
                {
                    this.props.headerConfig.showCloseBtn
                    ? <button className={`${this.props.className}-close-btn`} onClick={this.closeDialog} >x</button>
                    : null
                }
            </div>
        )
    }
}

export default DialogHeader;