import React from 'react';

/**
 * Dialog mask
 */
class Mask extends React.Component{
    constructor(){
        super();
        this.closeDialog      = this.closeDialog.bind(this);
        this.touchMoveHandler = this.touchMoveHandler.bind(this);

    }
    closeDialog = (e)=>{
        if(!this.props.quickClose) return;
        this.props.closeDialog(e);
     }
     touchMoveHandler = (e)=>{
         //e.preventDefault();
     }
     render(){
         return (
             <div 
                onTouchMove={this.touchMoveHandler} 
                onClick={this.closeDialog} 
                className={this.props.className}
            >
            </div>
         )
     }
}

export default Mask;