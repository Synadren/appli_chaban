import React from 'react';
import Search from '../component/search';
import Liste from '../component/liste';
import {Col, Card, Row, ProgressBar, Modal, Button} from 'react-materialize'

let errDate = ""
var moment = require('moment');
moment().format();

export default class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            from : "",
            to : "",
            data : ""
        }
    }

    fetchApi(){
        //?from=00-00-0000&to=00-00-0000
        fetch("http://localhost:1337/?from="+this.state.from+"&to="+this.state.to)
        .then(res => res.json())
        .then(data => {
            this.setState({
                data : data
            })
        })
        .catch(e => console.error(e))
    }


    componentDidMount(){
        this.fetchApi()
    }

    handleInputChangeFrom = (newValeur) => {
        this.setState({
            from : newValeur
        })
        
    }
    handleInputChangeTo = (newValeur) => {
        this.setState({
            to : newValeur
        })
        
    }
    
    handleButtonClick = (event) => {

        
        
        const regex = /[\d][\d]-[\d][\d]-[\d][\d][\d][\d]/g
        let dateValidFrom = regex.test(this.state.from)
        let dateValidTo = regex.test(this.state.to)
        let mDateFrom = moment(this.state.from , "DD-MM-YYYY")
        let mDateTo = moment(this.state.to, "DD-MM-YYYY")

        if(dateValidFrom || dateValidTo){
            
            console.log("FROM : " + mDateFrom + " TO : " + mDateTo)
            
            if(mDateFrom > mDateTo){
                
                errDate = (
                    <div className="err">
                    La date de départ doit être inférieur à la date de fin
                    </div>
                )
                
            }
            else{
                errDate = ""
                this.setState({
                    data : ""
                })
                this.fetchApi()
                console.log("HOME : " +this.state.data)
            }
        }
        else if((this.state.from === "") && (this.state.to === "")){
            this.setState({
                data : ""
            })
            this.fetchApi()
        }
        else{
            
            errDate = (
                <div className="err">
                Veuillez indiquer une date au format JJ-MM-AAAA
                </div>
            )
        }

        
    }
    

 


    render(){

        return(

            <div>
                <Row>
                <Col m={3}></Col>
                <Col m={6} s={12} className="mainCard">
                    <Card className='white' textClassName='blue-grey-text'>
                        <Search 
                            data={this.state.data}
                            valueFrom = {this.state.from}
                            valueTo = {this.state.to}
                            onInputChangeStart={this.handleInputChangeFrom}
                            onInputChangeEnd={this.handleInputChangeTo}

                            onButtonClick = {this.handleButtonClick}
                        />
                        {errDate}
                        <Liste data={this.state.data} />
                    </Card>
                </Col>
                <Col m={3}></Col> 
            </Row>
            
            </div>

        )
    }
}