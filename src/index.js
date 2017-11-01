
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';




import Dialog from './Dialog';

class Demo extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false
        }
        this.showDialog = this.showDialog.bind(this);
        this.afterCancel = this.afterCancel.bind(this);
    }
    showDialog(){
        this.setState((prevState)=>{
            return {
                open: true
            }
        });
    }
    afterCancel(){
       // alert(123);
    }
    render(){
       /**
        * afterCancel  : 关闭弹窗后callback           type: function
        * open         : 是否打开Dialog               type: bool
        * destory      : 关闭弹窗是否销毁DOM           type: 
        * fixed        : 打开弹窗后是否允许页面滚动
        * headerConfg  : 弹窗header配置
        * footerConfig : 弹窗footer配置
        *
        *
        */
       return (
        <div>
            <button className='btn' onClick={this.showDialog}>show dialog</button>
            <Dialog 
               afterCancel = {this.afterCancel}
               open = {this.state.open}
               destory = {true}
               fixed = {true}
               dialogStyle = {
                   {
                       width: '500px'
                   }
               }
               headerConfg = {
                   {
                       title: '标题'
                   }
               }
               footerConfig = {
                   {
                      
                   }
               }
               
            >
                <ul>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                </ul>
            </Dialog>
         </div>
       )
       
    }
}


class Demo2 extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false
        }
        this.showDialog = this.showDialog.bind(this);
        this.afterCancel = this.afterCancel.bind(this);
    }
    showDialog(){
        this.setState((prevState)=>{
            return {
                open: true
            }
        });
    }
    afterCancel(){
       // alert(123);
    }
    render(){
       /**
        * afterCancel  : 关闭弹窗后callback           type: function
        * open         : 是否打开Dialog               type: bool
        * destory      : 关闭弹窗是否销毁DOM           type: 
        * fixed        : 打开弹窗后是否允许页面滚动
        * headerConfg  : 弹窗header配置
        * footerConfig : 弹窗footer配置
        *
        *
        */
       return (
        <div>
            <button className='btn btn2' onClick={this.showDialog}>show dialog2</button>
            <Dialog 
               afterCancel = {this.afterCancel}
               open = {this.state.open}
               destory = {true}
               fixed = {true}
               dialogStyle = {
                   {
                       width: '500px'
                   }
               }
               headerConfg = {
                   {
                       title: '标题'
                   }
               }
               footerConfig = {
                   {
                      
                   }
               }
               
            >
                <ul>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                    <li>123213</li>
                </ul>
            </Dialog>
         </div>
       )
       
    }
}

class Demo3 extends React.Component{
    render(){
        return (
            <div>
                <Demo />
                <Demo2 />
            </div>
        )
    }
}
ReactDOM.render(
    <Demo3 />,
    document.getElementById('root')
);


















registerServiceWorker();
