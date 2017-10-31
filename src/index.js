
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
