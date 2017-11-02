import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

const classPreFix = 'yy-dialog';
const DialogCollection = [];
const BODY = document.body;
const KEY_CODE = {
    ESC: 27
}
const OpenDialogType = {
    'CREATE_DIALOG': 'CREATE_DIALOG',
    'DISPLAY_DIALOG': 'DISPLAY_DIALOG'
}
const emptyFun = ()=>{};

setInterval(()=>{
    console.log(DialogCollection);
}, 2000);

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
       if(!this.props.quickClose) return;
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
                content: nextProps.children
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
        this.cancelHandle  = this.cancelHandle.bind(this);
        this.confirmHandle = this.confirmHandle.bind(this);
    }
    static defaultProps = {
        showFooterBtns: true
    }
    componentWillMount(){
    }
    cancelHandle = (e) =>{
        this.props.cancel(e);
    }
    confirmHandle = (e) =>{
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
    render(){
        return (
            <footer className={`${classPreFix}-footer`}>
                {this.renderBtns()}
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
        
        this.createMaskElem          = this.createMaskElem.bind(this);
        this.createDialogHeaderElem  = this.createDialogHeaderElem.bind(this);
        this.createDialogContentElem = this.createDialogContentElem.bind(this);
        this.createDialogFooterElem  = this.createDialogFooterElem.bind(this);
        this.onKeyDown               = this.onKeyDown.bind(this);
        this.cancel                  = this.cancel.bind(this);
        //this.confirm                 = this.confirm.bind(this);

        this.openDialog              = this.openDialog.bind(this);
        this.closeDialog             = this.closeDialog.bind(this);
        this.showDialog              = this.showDialog.bind(this);
        this.setScreenFixed          = this.setScreenFixed.bind(this);
        this.getDialogContainer.bind(this)();

     }
     componentWillMount = ()=>{
        this.setState(()=>{
            return {
                open: this.props.open
            }
        });
     }
     componentDidMount = ()=>{
        
    
     }
     componentWillUnmount = ()=>{
        
     }
     componentWillReceiveProps = (nextProps)=>{
        let TYPE;
        if(nextProps.open && !this.state.open ){
            /**
             * 创建Dialog UI元素
             */
            TYPE = 'CREATE_DIALOG';
        } else if(nextProps.open && this.state.open ){
            /**
             *  默认关闭Dialog只是设置{display: 'none'}
             *  当再次打开时候只设置{display: 'block'}
             */
            TYPE = 'DISPLAY_DIALOG';
        } 

        this.openDialog(TYPE);

     }

     static defaultProps = {
         afterOpen      : emptyFun,
         afterClose     : emptyFun,
         afterCancel    : emptyFun,
         afterDestroy   : emptyFun,
         open           : false,
         showMask       : true,
         quickClose     : true
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
         open           : PropTypes.bool.isRequired,
         showMask       : PropTypes.bool,
         quickClose     : PropTypes.bool
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
   
     setScreenFixed = (isFixed)=>{
        isFixed ? BODY.style.overflow = 'hidden' : BODY.style.overflow = '';
     }
     getDialogContainer = ()=>{
         let container = document.createElement('div');
             container.id = 'J_portal_mount_node_'+this._id;
             this._portalNode = container;
     }
     createDialogHeaderElem = (headerConfig)=>{
        if(headerConfig === undefined) return null;
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
     createDialogFooterElem = (footerConfig)=>{
        if(footerConfig === undefined) return null;
        return (
            <DialogFooter
              cancel = {this.cancel}
              confirm = {this.props.confirm}
              buttons = {footerConfig.buttons}
            >
            </DialogFooter>
        )
     }
     createMaskElem = ()=>{
        return (
            this.state.open && this.props.showMask
            ? <Mask quickClose={this.props.quickClose} closeDialog={this.closeDialog} />
            : null
        )
     }
     openDialog = (TYPE) =>{
         let bool = TYPE === OpenDialogType.CREATE_DIALOG;
         this.setState(()=>{
             return {
                [ bool ? 'open' : 'display' ]: bool ? true : 'block'
             }
         }, ()=>{
             if(bool){
                BODY.appendChild(this._portalNode)
                DialogCollection.push(this);
             }
             this.setScreenFixed(true)
         });

     }
     closeDialog = (e)=>{
        const {destory} = this.props;
        this.setState(()=>{
            return {
                [ destory ? 'open' : 'display' ]: destory ? false : 'none'
            }
        }, ()=>{
            this.setScreenFixed(false)
        });
     }
     showDialog = (e)=>{
         this.setState(()=>{
             return {
                 display: 'block'
             }
         }, ()=>{
            this.setScreenFixed(true)
         });
     }
     cancel = (e) =>{
        this.closeDialog();
        this.props.afterCancel();
     }
     onKeyDown = (e) =>{
         
        //  if(e.keyCode !== KEY_CODE.ESC) return;
        
        //  this.closeDialog(e);
     }
     render(){
         const cls = this.props.className ? `${classPreFix}-wrapper ` + this.props.className: `${classPreFix}-wrapper`;
         return createPortal(
             <div id={ 'dialog_'+ this._id } style={{ display : this.state.display}} className={cls}>
                 {
                     this.createMaskElem()
                 }
                 {
                    this.state.open
                     ? <div className={`${classPreFix}`} >

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
                     : null
                   
                    
                 }
             </div>,
             this._portalNode

         )
     }
 }

 export default Dialog;