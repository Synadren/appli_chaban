import React from 'react'
import {BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import {ProgressBar, Row, Col, Button, Icon, Card} from 'react-materialize'
import swal from 'sweetalert'


export default class SinglePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            data : ""
        }
        
    }

    componentDidMount(){
        fetch("http://localhost:1337/", {
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

    render(){

        if(!this.state.data){
            return(
                <Row>
                <Col s={12}>
                    <ProgressBar />
                </Col>
            </Row>
            )
        }


        let maxID = this.state.data.length

        const {match} = this.props;
        const id = match.params.id;
        const idNext = +id + 1;
        const idPrev = +id -1;

        if(+id < 0 || +id > (maxID-1) || +id !== 0 && Boolean(+id) === false){
            return(
                <Redirect to="/404" />
            )
        }

        return(
            <div>
                <Row>
                    <Col m={3}></Col>
                    <Col m={6} s={12} className="mainCard">
                        <Link to={`/${idPrev}`}><Button className="btnNav"><Icon>arrow_back</Icon></Button></Link> 
                        <Link to="/"><Button className="btnNav"><Icon>home</Icon></Button></Link>
                        <Link to={`/${idNext}`}><Button className="btnNav last"><Icon>arrow_forward</Icon></Button></Link>
                        <Card className='white' textClassName='blue-grey-text'>
                            <h5>Le pont sera fermé le {this.state.data[id].date}</h5>
                            <h6>de {this.state.data[id].start} à {this.state.data[id].end}</h6>
                            <h6>Raison : {this.state.data[id].reason}</h6>
                        </Card>
                    </Col>
                    <Col m={3}></Col>
                </Row>


                

                

                <Route path="/1" render = {() =>{
                    return(
                        <p>blabla page {id}</p>
                    )
                }}/>
            </div>
        )
    }
}