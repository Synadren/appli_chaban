import React from 'react';
import Search from '../component/search';
import Liste from '../component/liste';
import {Col, Card, Row} from 'react-materialize'
import swal from 'sweetalert'



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
        fetch("http://localhost:1337/?from="+this.state.from+"&to="+this.state.to, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                data : data
            })
        })
        .catch(function(error) {
            swal("Erreur", "Une erreur est survenue pendant le chargement des données, rechargez la page", "error")
            console.log(error)
            
        });
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

        var moment = require('moment');
        moment().format();

        let mDateFrom = moment(this.state.from , "DD-MM-YYYY")
        let mDateTo = moment(this.state.to, "DD-MM-YYYY")
        let mDateValidFrom = mDateFrom.isValid()
        let mDateValidTo = mDateTo.isValid()


        if(mDateValidFrom || mDateValidTo){

            
            if(mDateFrom > mDateTo){
                swal("La date de départ doit être inférieur à la date de fin")
            }
            else if(!mDateValidFrom){
                swal("Veuillez indiquer une date de début correcte au format JJ-MM-AAAA")
            }
            else if(!mDateValidTo){
                swal("Veuillez indiquer une date de fin correcte au format JJ-MM-AAAA")
            }
            else{
                this.setState({
                    data : ""
                })
                this.fetchApi()
            }
        }
        else if((this.state.from === "") && (this.state.to === "")){
            this.setState({
                data : ""
            })
            this.fetchApi()
        }
        else{
            swal("Veuillez indiquer une date correcte au format JJ-MM-AAAA")
        }

        
    }
    

 


    render(){

        return(

            <div>
                <Row>
                <Col m={3}></Col>
                <Col m={6} s={12} className="mainCard">
                    
                    <Card className='white' textClassName='blue-grey-text'>
                    <h5>Horraires du pont Chaban-Delmas</h5>
                        <Search 
                            data={this.state.data}

                            valueFrom = {this.state.from}
                            valueTo = {this.state.to}
                            onInputChangeStart={this.handleInputChangeFrom}
                            onInputChangeEnd={this.handleInputChangeTo}

                            onButtonClick = {this.handleButtonClick}
                        />
                        <Liste data={this.state.data} />
                    </Card>

                </Col>
                <Col m={3}></Col> 
            </Row>
            
            </div>

        )
    }
}