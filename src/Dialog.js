import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

const classPreFix = 'yy-dialog';
const DialogCollection = {};
const body = document.body;
const KEY_CODE = {
    ESC: 27
}
const emptyFun = ()=>{};

/**
 * Dialog mask
 * 
 */
class Mask extends React.Component{
    constructor(){
        super();
        this.closeDialog = this.closeDialog.bind(this);
    }
    closeDialog = (e)=>{
       this.props.closeDialog(e);
    }
    render(){
        return (
            <div onClick={this.closeDialog} className={`${classPreFix}-mask`}></div>
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
        this.closeDialog = this.closeDialog.bind(this);
    }
    closeDialog = (e)=>{
        this.props.closeDialog(e);
    }
    render(){
        return (
            <header className={`${classPreFix}-header`}>
                <div>{this.props.title}</div>
                <button className={`${classPreFix}-close-btn`} onClick={this.closeDialog} >x</button>
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
            <section className={`${classPreFix}-content`}>
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
        this.__cancelHandle  = this.__cancelHandle.bind(this);
        this.__confirmHandle = this.__confirmHandle.bind(this);
    }
    static defaultProps = {
        showFooterBtns: true
    }
    componentWillMount(){
        
    }
    __cancelHandle = (e) =>{
        this.props.cancel(e);
    }
    __confirmHandle = () =>{
        
    }
    __renderBtns = ()=>{
        if(this.props.buttons) {
            return this.props.buttons;
        }
        return (
            <div>
                <button  key='cancel' onClick={this.__cancelHandle} >取消</button>
                <button  key='confirm' >确定</button>
            </div>
        )
    }
    render(){
        return (
            <footer className={`${classPreFix}-footer`}>
                {this.__renderBtns()}
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
            open: false,
            display: 'block'
         }
         this._id = +new Date();
         this.eventHandle.bind(this)();
        
     }
     eventHandle = ()=>{
        this.onKeyDown               = this.onKeyDown.bind(this);
        this.cancel                  = this.cancel.bind(this);
        this.createMaskElem          = this.createMaskElem.bind(this);
        this.createDialogHeaderElem  = this.createDialogHeaderElem.bind(this);
        this.createDialogContentElem = this.createDialogContentElem.bind(this);
        this.createDialogFooterElem  = this.createDialogFooterElem.bind(this);
        this.getDialogContainer.bind(this)();

     }
     componentWillMount = ()=>{
         
        // this.setState(()=>{
        //     return {
        //         visible: this.props.visible
        //     }
        // }, ()=>{
        //     console.log(this.state);
        // });
     }
     componentDidMount = ()=>{
         //
        //  document.on('touchmove', (e)=>{
        //     e.preventDefault();
        //  })
        //  document.addEventListener('touchmove', (e)=>{
        //      console.log(123);
        //     e.preventDefault();
        //  })
     }
     componentWillUnmount = ()=>{
         this._portalNode
        //this._portalNode.parentNode.removeChild(this._portalNode);
     }
     componentWillReceiveProps = (nextProps)=>{
        document.body.appendChild(this._portalNode);
        this.setState(()=>{
            return {
                open: nextProps.open
            }
        }, ()=>{
            if(this.props.fixed){
                document.body.style.overflow = 'hidden';
            }
        });
     }

     static defaultProps = {
         afterOpen      : emptyFun,
         afterClose     : emptyFun,
         afterCancel    : emptyFun,
         afterDestroy   : emptyFun,
         open        : false,
         showMask       : true,
         quickClose     : true,
         classPreFix    : 'yy-dialog'
        //  headerConfg: {
        //      showHeader: true,
        //      title: '',
        //      showCloseBtn: true
        //  },
        //  footerConfig: {
        //      showFooterBtns: true,
        //      buttons: [
        //         <button key='cancel'>取消</button>,
        //         <button key='confirm' >确定</button>
        //      ]
        //  }
     }

     static propTypes = {
         afterOpen      : PropTypes.func,
         afterClose     : PropTypes.func,
         afterCancel    : PropTypes.func,
         afterDestory   : PropTypes.func,
         open        : PropTypes.bool,
         showMask       : PropTypes.bool,
         quickClose     : PropTypes.bool,
         classPreFix    : PropTypes.string
        //  headerConfg: {
        //      showHeader: PropTypes.bool,
        //      title: PropTypes.string,
        //      showCloseBtn: PropTypes.bool
        //  },
        //  footerConfig: {
        //      showFooterBtns: PropTypes.bool,
        //      buttons: PropTypes.array
        //  }
     }
     getDialogContainer = ()=>{
         let container = document.createElement('div');
             container.id = 'J_potal_mount_node_'+this._id;
             this._portalNode = container;
     }
     createDialogHeaderElem = (headerConfig)=>{
        return (
            <DialogHeader
                title = {
                    headerConfig.title
                }
                closeDialog = {this.closeDialog}
            />  
        )
     }
     createDialogContentElem = ()=>{
         return (
            <DialogContent>
                {this.props.children}
            </DialogContent>
         )
     }
     createDialogFooterElem = ()=>{
        return (
            <DialogFooter
              cancel = {this.cancel}
              buttons = {this.props.footerConfig.buttons}
            >
            </DialogFooter>
        )
     }
     createMaskElem = ()=>{
        return (
            this.state.open && this.props.showMask
            ? <Mask closeDialog={this.closeDialog} />
            : null
        )
     }
     closeDialog = (e)=>{
        const {destory} = this.props;
        let   prop;
        let   value;
        this.setState(()=>{
            if(destory){
                return {
                    'open' : false
                }
            }else{
                return {
                    'display': 'none'
                }
            }
            
        }, ()=>{
            if(this.props.fixed) document.body.style.overflow = 'auto';
        });
        
     }
     cancel = (e) =>{
        this.closeDialog();
        this.props.afterCancel();
     }
     onKeyDown = (e) =>{
         if(e.keyCode != KEY_CODE.ESC) return;
         this.closeDialog(e);
     }
     render(){
         const cls = this.props.className ? `${classPreFix}-wrapper ` + this.props.className: `${classPreFix}-wrapper`;
         return createPortal(
             <div id={ 'dialog_'+ this._id } className={cls}>
                 {this.createMaskElem()}
                 {
                     this.state.open
                     ? <div 
                            onKeyDown={this.onKeyDown}
                            style={{'display': this.state.display}}
                            className={`${classPreFix}`}
                        >
                            <div className={`${classPreFix}-instance`}>
                                {
                                    this.createDialogHeaderElem(this.props.headerConfg)
                                }
                                {
                                    this.createDialogContentElem()
                                }
                                {
                                    this.createDialogFooterElem(this.props.footerConfig)
                                }
                            </div>
                            
                       </div>
                     : null
                 }
             </div>,
             this._portalNode

         )
     }
 }

 export default Dialog;