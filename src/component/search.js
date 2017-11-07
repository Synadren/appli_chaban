import React from 'react';
import InputDate from './input'
import {Row, Button, Icon} from 'react-materialize'

export default class Search extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }


    handleChangeStart = (event) => {
        const newValeur = event.target.value;
        this.props.onInputChangeStart(newValeur);
    }
    handleChangeEnd = (event) => {
        const newValeur = event.target.value;
        this.props.onInputChangeEnd(newValeur);
    }

    

    render(){

        return(
            <div>
                <Row>
                    <InputDate 
                        placeHolder = "Date de début"
                        inputChange = {this.handleChangeStart}
                        inputValue = {this.props.valueFrom}
                     />
                     <InputDate 
                        placeHolder = "Date date de fin"
                        inputChange = {this.handleChangeEnd}
                        inputValue = {this.props.valueTo}
                     />

                     <a 
                        className="waves-effect waves-light btn btnSearch"
                        onClick = {this.props.onButtonClick}
                            
                    >
                        <Icon>search</Icon>
                    </a>
                    
                </Row>
                
            </div>
        )
    }
}