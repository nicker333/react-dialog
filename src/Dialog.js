import React from 'react';
import PropTypes from 'prop-types';

const classPreFix = 'yy-dialog';
const DialogCollection = {};
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
        this.__closeDialog = this.__closeDialog.bind(this);
    }
    __closeDialog = (e)=>{
       this.props.closeDialog(e);
    }
    render(){
        return (
            <div onClick={this.__closeDialog} className={`${classPreFix}-mask`}></div>
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
            visible: false
         }
         this.__id = +new Date();
         this.eventHandle.bind(this)();
        
     }
     eventHandle = ()=>{
        this.onKeyDown               = this.onKeyDown.bind(this);
        this.cancel                  = this.cancel.bind(this);
        this.createMaskElem          = this.createMaskElem.bind(this);
        this.createDialogHeaderElem  = this.createDialogHeaderElem.bind(this);
        this.createDialogContentElem = this.createDialogContentElem.bind(this);
        this.createDialogFooterElem  = this.createDialogFooterElem.bind(this);

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
     }
     componentWillReceiveProps = (nextProps)=>{
        this.setState(()=>{
            return {
                visible: nextProps.visible
            }
        }, ()=>{
            if(this.props.fixed) document.body.style.overflow = 'hidden';
        });
     }

     static defaultProps = {
         afterOpen      : emptyFun,
         afterClose     : emptyFun,
         afterCancel    : emptyFun,
         afterDestroy   : emptyFun,
         visible        : false,
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
         visible        : PropTypes.bool,
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
            this.state.visible && this.props.showMask
            ? <Mask closeDialog={this.closeDialog} />
            : null
        )
     }
     closeDialog = (e)=>{
        //const {quickClose} = this.props;
        this.setState(()=>{
            return {
                visible: false
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
         return (
             <div id={ 'dialog_'+ this.__id } className={cls}>
                 {this.createMaskElem()}
                 {
                     this.state.visible
                     ? <div onKeyDown={this.onKeyDown} style={this.props.dialogStyle} className={`${classPreFix}`}>
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
             </div>
         )
     }
 }

 export default Dialog;