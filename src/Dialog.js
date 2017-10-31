import React from 'react';
import PropTypes from 'prop-types';

const classPreFix = '';
const DialogCollection = {};

setInterval(()=>{
    console.log(DialogCollection);
}, 2000)

/**
 * Dialog mask
 * 
 */
class Mask extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className='yy-dialog-mask'></div>
        )
    }

    
}

/**
 * Dialog header
 * 
 */

class DialogHeader extends React.Component{
    constructor(){
        super();
        this.__eventHandler.bind(this)();
    }
    
    static propTypes = {
        title: PropTypes.oneOf(
            [
                PropTypes.string,
                false
            ]
        ),
        showCloseBtn: PropTypes.bool
    }

    static defaultProps = {
        title: '',
        showCloseBtn: true
    }

    __eventHandler(){
        this.__handleClose = this.__handleClose.bind(this);
    }
    __handleClose(){
        alert(123);
    }
    render(){
        return (
            <header className='yy-dialog-header'>
                <div>{this.props.Config.title}</div>
                <button onClick={this.__handleClose} >x</button>
            </header>
        )
    }
}

/**
 * Dialog content
 * 
 */
class DialogContent extends React.Component{
    constructor(){
        super();
        this.state = {
            content: ''
        }
       
    }

    static propTypes = {
        showMask: PropTypes.bool,
        quickClose: PropTypes.bool
    }

    static defaultProps = {
        showMask: true,
        quickClose: true,

    }

    componentWillMount(){
        this.setState(()=>{
            return {
                content: this.props.children
            }
        });
    }
   
    componentWillReceiveProps(nextProps){
        this.setState(()=>{
            return {
                content: nextProps
            }
        });
    }
    render(){
        return (
            <section className='yy-dialog-content'>
                {this.state.content}
            </section>
        )
    }
}

/**
 * Dialog footer
 * 
 */
class DialogFooter extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <footer className='yy-dialog-footer'>
                {this.props.Config.buttons}
            </footer>
        )
    }
}

/**
 * Dialog
 * 
 */

 class Dialog extends React.Component{
     constructor(){
         super();
        
         this.state = {
            visible: false,
            style: {
                display: 'block'
            }
         }
         this.__id = +new Date();

         this.closeDialog = this.closeDialog.bind(this);
     }
     
     close(){
        /**
         * Hide the dialog.
         */
        this.setState(()=>{
            return {
                style: {
                    display: 'none'
                }
            }
        });
     }
     
     remove(){
        /**
         * Remove the dialog dom from the page.
         */
        this.setState(()=>{
            return {
                visible: false
            }
        });
     }
     getDialog(){
         /**
          * Get the current dialog instance for that you can get the api.
          */
         return this;
     }
     componentWillMount(){
        this.setState(()=>{
            return {
                visible: this.props.Config.globalConfig.visible
            }
        });
     }
     componentDidMount(){
        DialogCollection[this.__id] = this;
     }
     componentWillUnMount(){
        delete DialogCollection[this.__id];
     }
     componentWillReceiveProps(nextProps){
        this.setState(()=>{
            return {
                visible: nextProps.Config.globalConfig.visible
            }
        })
     }
     render(){
        
         const {globalConfig} = this.props.Config;
         const cls = this.props.className ? 'yy-dialog-wrapper ' + this.props.className: 'yy-dialog-wrapper';
         return (
             <div id={ 'J_yy_dialog_'+ this.__id } className={cls}>
                 {
                     this.state.visible
                     ? <div className='yy-dialog'>
                            <DialogHeader
                                Config={
                                    this.props.Config.headerConfig
                                }
                            />  
                            <DialogContent>
                                {this.props.children}
                            </DialogContent>
        
                            <DialogFooter
                                Config={
                                    this.props.Config.footerConfig
                                }
                            />
                       </div>
                     : null
                 }
             </div>
         )
     }
 }

 export default Dialog;