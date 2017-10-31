
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//如何理解数据更新同步DOM变化
import Lists from './DataAndDom';


//jsx
import JSXDEMO from './JSXDEMO';


//react event
import EventDemo from './EventDemo';


//componentsTree
import Family from './componentsTree';



//生命周期执行顺序
import Life from './lifeCycle';


//组件之间通过props层级传递数据进行通信
import MsgByProps from './componentMsgByProps';


//组件之间通过发布/订阅传递数据进行通信
import MsgBySubPub from './componentMsgByPubSub';



//组件之间通过flux来传递数据进行通信
import Products from './componentMsgByFlux';


import Dialog from './Dialog';

class Demo extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: false
        }
        this.showDialog = this.showDialog.bind(this);
    }
    showDialog(){
        this.setState(()=>{
            return {
                visible: true
            }
        });
    }
    render(){
       return (
        <div>
        <button onClick={this.showDialog}>show dialog</button>
         <Dialog 
            Config={{
                globalConfig: {
                    showMask:true,
                    visible: this.state.visible
                },
                headerConfig: {
                    title: 'dialog标题'
                },
                footerConfig: {
                    buttons: [
                        <button  key='cancel'>取消</button>,
                        <button key='confim'>确定</button>
                    ]
                }
            }}
        >
            <input type='text' autoFocus />
            <p>老子要造最好用的react dialog</p>
            <p>老子要造最好用的react dialog</p>
            <p>老子要造最好用的react dialog</p>
        </Dialog>
    </div>
       )
       
    }
}

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);


















registerServiceWorker();
