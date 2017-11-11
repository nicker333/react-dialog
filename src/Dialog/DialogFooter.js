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
                <button  key='cancel' onClick={this.cancelHandle} >取消</button>
                <button  key='confirm' onClick={this.confirmHandle} >确定</button>
            </div>
        )
    }
    render = ()=>{
        return (
            <footer className={this.props.className}>
                {this.renderBtns()}
            </footer>
        )
    }
}

export default DialogFooter;