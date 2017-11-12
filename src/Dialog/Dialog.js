import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import Mask from './Mask';
import DialogHeader  from './DialogHeader';
import DialogContent from './DialogContent';
import DialogFooter  from './DialogFooter';

const CLASS_PRE_FIX = 'yy-dialog';
const BODY = document.body;
const KEY_CODE = {
    ESC: 27
}
const EMPTY_FN = ()=>{};

/**
 * Dilog
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
       this.setState(()=>{
           return {
               open: this.props.open
           }
       });
    }
    componentWillReceiveProps = (nextProps)=>{
       let TYPE;
       if(nextProps.open && !this.state.open ){
           /**
            * Create Dialog element.
            */
           TYPE = 'CREATE_DIALOG';
           this.openDialog(TYPE);
       } else if(nextProps.open && this.state.open ){
           /**
            *  When reopen dialog, just set it show.
            */
           TYPE = 'DISPLAY_DIALOG';
           this.openDialog(TYPE);
       } else if(!nextProps.open && this.state.open && !this.props.destory ){
           /**
            *  By default, close dialog just set it hidden.
            */
           TYPE = 'HIDE_DIALOG';
           this.closeDialog(TYPE);
       } else if(!nextProps.open && this.state.open && this.props.destory) {
           /**
            *  Remove the dialog dom node when the Component propty destory is true.
            */
           TYPE = 'DESTORY_DIALOG';
           this.closeDialog(TYPE);
       }

    }

    static defaultProps = {
        afterOpen      : EMPTY_FN,
        afterClose     : EMPTY_FN,
        afterCancel    : EMPTY_FN,
        afterDestroy   : EMPTY_FN,
        open           : false,
        showMask       : true,
        quickClose     : true,
        headerConfg: {
            showHeader: true,
            title: '',
            showCloseBtn: true
        }
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
            container.id = 'J_portal_dialog_node_'+this._id;
            this._portalNode = container;
    }
    createDialogHeaderElem = (headerConfig)=>{
       if(headerConfig === undefined) return null;
       return (
           <DialogHeader
               headerConfig = {headerConfig}
               closeDialog = {this.closeDialog}
               className = {`${CLASS_PRE_FIX}-header`}
           />  
       )
    }
    createDialogContentElem = ()=>{
        return (
           <DialogContent
               className = {`${CLASS_PRE_FIX}-content`}
           >
               {this.props.children}
           </DialogContent>
        )
    }
    createDialogFooterElem = (footerConfig)=>{
       return (
           <DialogFooter
             cancel = {this.cancel}
             confirm = {this.props.confirm}
             buttons = {footerConfig.buttons}
             cancelText = {footerConfig.cancelText}
             confirmText = {footerConfig.confirmText}
             className = {`${CLASS_PRE_FIX}-footer`}
           >
           </DialogFooter>
       )
    }
    createMaskElem = ()=>{
       return (
           this.state.open && this.props.showMask
           ? <Mask 
                quickClose={this.props.quickClose}
                closeDialog={this.closeDialog}
                className = {`${CLASS_PRE_FIX}-mask`}
              />
           : null
       )
    }
    openDialog = (TYPE) =>{
        let isCreateDialog = TYPE === 'CREATE_DIALOG';
        this.setState(()=>{
            return {
               [ isCreateDialog ? 'open' : 'display' ]: isCreateDialog ? true : 'block'
            }
        }, ()=>{
            if(isCreateDialog){
               BODY.appendChild(this._portalNode)
            }
            this.setScreenFixed(true)
        });

    }
    closeDialog = (TYPE)=>{
       let isDestoryDialog = TYPE === 'DESTORY_DIALOG';
       this.setState(()=>{
           return {
               [ isDestoryDialog ? 'open' : 'display' ]: isDestoryDialog ? false : 'none'
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
       this.props.afterCancel && this.props.afterCancel();
    }
    onKeyDown = (e) =>{
        
        
    }
    render(){
        const cls = this.props.className ? `${CLASS_PRE_FIX}-wrapper ` + this.props.className: `${CLASS_PRE_FIX}-wrapper`;
        return createPortal(
            <div id={ 'dialog_'+ this._id } style={{ display : this.state.display}} className={cls}>
                {
                    this.createMaskElem()
                }
                {
                   this.state.open
                    ? <div className={`${CLASS_PRE_FIX}`} >
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