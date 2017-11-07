import React from 'react';
import {Input} from 'react-materialize'

export default class InputDate extends React.Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){

        return(
            <Input 
                s={6}
                placeholder = {this.props.placeHolder}
                onChange = {this.props.inputChange}
                value = {this.props.inputValue}
            />
        )
    }


}