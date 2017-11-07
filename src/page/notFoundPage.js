import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {Row, Col, Card, Icon} from 'react-materialize'

export default class SinglePage extends React.Component{

    render(){
        return(
            <div>
                <Row>
                <Col m={3}></Col>
                <Col m={6} s={12} className="mainCard">
                    <Card className="white">
                    <h1>404</h1>
                    <h5>La page demandée n'existe pas</h5>
                    <Link to="/"> 
                        <div 
                            className="waves-effect waves-light btn btnSearch"
                            onClick = {this.props.onButtonClick}    
                        >
                        <Icon>home</Icon>
                        </div>
                    </Link>
                    </Card>
                </Col>
                <Col m={3}></Col>
                </Row>
            </div>
        )
    }

}
