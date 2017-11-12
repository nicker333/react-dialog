import React from 'react';

/**
 *  Dialog content
 */

class DialogContent extends React.Component{
    constructor(){
        super();
        this.state = {
            content: ''
        }
       
    }
    componentWillMount = ()=>{
        this.setState(()=>{
            return {
                content: this.props.children
            }
        });
    }
    componentWillReceiveProps = (nextProps)=>{
        this.setState(()=>{
            return {
                content: nextProps.children
            }
        });
    }
    render = ()=>{
        return (
            <div className={this.props.className}>
                {this.state.content}
            </div>
        )
    }
}

export default DialogContent;