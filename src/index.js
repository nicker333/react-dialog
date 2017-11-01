
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
            visible: false
        }
        this.showDialog = this.showDialog.bind(this);
        this.afterCancel = this.afterCancel.bind(this);
    }
    showDialog(){
        this.setState((prevState)=>{
            return {
                visible: true
            }
        });
    }
    afterCancel(){
        alert(123);
    }
    render(){
       return (
        <div>
            <button onClick={this.showDialog}>show dialog</button>
            <Dialog 
               afterCancel = {this.afterCancel}
               visible = {this.state.visible}
               fixed = {true}
               dialogStyle = {
                   {
                       width: '500px'
                   }
               }
               headerConfg = {
                   {
                       title: '弹窗标题'
                   }
               }
               footerConfig = {
                   {
                      
                   }
               }
               
            >
                <input type='text' autoFocus />
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

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);


















registerServiceWorker();
