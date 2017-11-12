import React from 'react';

/**
 *  Dialog footer
 */

class DialogFooter extends React.Component{
    constructor(){
        super();
        this.cancelHandle  = this.cancelHandle.bind(this);
        this.confirmHandle = this.confirmHandle.bind(this);
    }
    static defaultProps = {
        showFooterBtns: true
    }
    cancelHandle = (e)=>{
        this.props.cancel(e);
    }
    confirmHandle = (e)=>{
        this.props.confirm(e)
    }
    renderBtns = ()=>{
        if(this.props.buttons) {
            return this.props.buttons;
        }
        return (
            <div>
                <button  key='cancel' onClick={this.cancelHandle} >{this.props.cancelText || 'cancel'}</button>
                <button  key='confirm' onClick={this.confirmHandle} >{this.props.confirmText || 'ok'}</button>
            </div>
        )
    }
    render = ()=>{
        return (
            <div className={this.props.className}>
                {this.renderBtns()}
            </div>
        )
    }
}

export default DialogFooter;