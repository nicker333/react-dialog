import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

const classPreFix = 'yy-dialog';
const DialogCollection = [];
const body = document.body;
const KEY_CODE = {
    ESC: 27
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
    confirmHandle = () =>{
        
    }
    renderBtns = ()=>{
        if(this.props.buttons) {
            return this.props.buttons;
        }
        return (
            <div>
                <button  key='cancel' onClick={this.cancelHandle} >取消</button>
                <button  key='confirm' >确定</button>
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

        this.openDialog              = this.openDialog.bind(this);
        this.closeDialog             = this.closeDialog.bind(this);
        this.showDialog              = this.showDialog.bind(this);
        this.setScreenFixed          = this.setScreenFixed.bind(this);
        this.getDialogContainer.bind(this)();

     }
     componentWillMount = ()=>{
         
        
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
         //console.log('un mount');
        // this._portalNode
        //this._portalNode.parentNode.removeChild(this._portalNode);
     }
     componentWillReceiveProps = (nextProps)=>{
        
        //console.log(this.state.open, nextProps.open, '====');
       
        if(!this.props.open && nextProps.open){
            
            this.openDialog();
        }else if(this.props.open && nextProps.open){
            
            this.showDialog();
        }else if(!this.state.open && nextProps.open){
            //this.openDialog();
        }

        let openDialogType;

        if(!this.props.open && nextProps.open){
            //创建Dialog UI元素
            openDialogType = 'CREATE_DIALOG';
        } else if(this.props.open && nextProps.open){
            //默认关闭Dialog只是设置{display: 'none'}
            //当再次打开时候只设置{display: 'block'}
            openDialogType = 'DISPLAY_DIALOG';
        }
        
     }

     static defaultProps = {
         afterOpen      : emptyFun,
         afterClose     : emptyFun,
         afterCancel    : emptyFun,
         afterDestroy   : emptyFun,
         open           : false,
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
         open           : PropTypes.bool.isRequired,
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
   
     setScreenFixed = (isFixed)=>{
        isFixed ? body.style.overflow = 'hidden' : body.style.overflow = '';
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
     openDialog = () =>{
         this.setState(()=>{
             document.body.appendChild(this._portalNode)
             return {
                open: true
             }
         }, ()=>{
             DialogCollection.push(this);
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