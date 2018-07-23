
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
consol.elog(111)


import Dialog from './Dialog/index';




class Demo2 extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false,
            showCloseBtn: false
        }
        this.showDialog = this.showDialog.bind(this);
        this.afterCancel = this.afterCancel.bind(this);

        this.cancel = this.cancel.bind(this);
        this.comfirm = this.comfirm.bind(this);
    }
    showDialog(){
        this.setState((prevState)=>{
            return {
                open: true
            }
        });
    }
    cancel(){
        this.setState(()=>{
            return {
                open: false
            }
        });
    }
    afterCancel(){
       // alert(123);
    }
    comfirm(){
        //alert(123);
       
        // this.setState({
        //     showCloseBtn: true
        // })
        this.setState(()=>{
            return {
                showCloseBtn: true
            }
        });
    }
    render(){
       /**
        * afterCancel  : 关闭弹窗后callback           type: function
        * afterConfirm : 点击确定后的callback         type: function
        * open         : 是否打开Dialog               type: bool
        * destory      : 关闭弹窗是否销毁DOM           type: 
        * fixed        : 打开弹窗后是否允许页面滚动
        * headerConfg  : 弹窗header配置
        * footerConfig : 弹窗footer配置
        *
        *
        */
        let showCloseBtns = this.state.showCloseBtn;
       return (
        
        <div>
            <button className='btn btn2' onClick={this.showDialog}>show dialog2</button>
            <Dialog
               afterCancel = {this.afterCancel}
               confirm = {this.confirm}
               open = {this.state.open}
               quickClose = {true}
               className = 'custorm-classname'
               destory = {true}
               dialogStyle = {
                   {
                       width: '500px'
                   }
               }
               headerConfg = {
                   {
                       title: 'dialog title',
                       showCloseBtn: this.state.showCloseBtn
                   }
               }
               footerConfig = {
                   {
                        cancelText: '取消',
                        confirmText: '确定'
                   }
               }
               
            >
                <ul style={{height: '200px', overflow: 'scroll'}} >
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                    <li>24324234</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>呵呵呵</li>
                    <li>我曹</li>
                    <li>牛逼</li>
                </ul>
            </Dialog>
         </div>
       )
       
    }
}


class Demo3 extends React.Component{
    render(){
        return (
            <div>234</div>
        )
    }
}
ReactDOM.render(
    <Demo2 />,
    document.getElementById('root')
);


















registerServiceWorker();
