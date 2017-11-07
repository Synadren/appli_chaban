import React from 'react';
import {CollectionItem, Collection, Button, Icon, Row, Col, ProgressBar} from 'react-materialize'
import {BrowserRouter as Router, Link} from 'react-router-dom'

export default class Liste extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }



    render(){

        console.log("LISTE : " + this.props.data)

        if(!this.props.data){
            return(
                <Row>
                <Col s={12}>
                    <ProgressBar />
                </Col>
            </Row>
            )
        }
        else if(this.props.data.length === 0){
            return(
                <div>
                    <Collection>
                        <CollectionItem>
                            <strong>Le pont ne sera pas fermé à ces dates</strong>
                        </CollectionItem>
                    </Collection>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Collection>
                    
                    {
                        this.props.data ? this.props.data.map((val, i) => {
                    
                            console.log("LISTE : " +this.props.data)
                            return (
                                <CollectionItem key={i} className="liste">
                                    <Link to={`/${i}`}>
                                        <Button waves='light'>
                                            <Icon>chevron_right</Icon>
                                        </Button>
                                    </Link>
                                    <span>Fermé le {val.date} </span>
                                    <span> de {val.start} </span>
                                    <span> à {val.end} </span>
                                    <span> pour cause de {val.reason} </span>
                                </CollectionItem>
                            )
                        
                    }) : null
                    
                    }
                    
                    </Collection>
                </div>
            )
        }
        

        
    }

}