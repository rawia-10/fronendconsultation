import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import { DateTime } from 'react-datetime-bootstrap';
class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      date:"",
      heure:"",
      etat:"",
      lieu:""
      
    
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handelSubmit()
  {
      console.log("state",this.state.date, this.state.heure,this.state.lieu,this.state.etat)
      axios.post("http://localhost:3017/rendezvous/addrendezvous",{
      date:this.state.date,
      heure:this.state.heure,
      lieu:this.state.lieu,
      etat:this.state.etat,
     
      })
.then(res=>{
    console.log("data",res.data);
    window.location.href="/#/home/listerendezvous"
})

  }


  reset()
  {
      this.setState({date:"",heure:"",etat:"",lieu:""})
  }



onchange= (event) => {
    this.setState({date: event.target.value});
    this.setState({heure: event.target.value});
    this.setState({lieu: event.target.value});
    this.setState({e: event.target.value});
   
  }
  render() {
    return (
      <div className="animated fadeIn">
       
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Ajout rendezvous</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                

                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">date  </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input defaultValue={this.state.date} 
                      onChange={evenement=>this.setState({date:evenement.target.value})}
                       type="date" id="date-input" name="date-input"  />
                    </Col>
                  </FormGroup>
                 {/* <FormGroup row>
                  <Col md="3">
                  <Label htmlFor="date-input">heure</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="time"> </Input>
                  </Col>
                </FormGroup>
                   */}

       

       
 <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">heure</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input   defaultValue={this.state.heure} 
                      onChange={evenement=>this.setState({heure:evenement.target.value})}
                       type="text" id="text-input" name="text-input"/>
                    
                    </Col>
                  </FormGroup> 
              
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">lieu</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input   defaultValue={this.state.lieu} 
                      onChange={evenement=>this.setState({lieu:evenement.target.value})}
                       type="text" id="text-input" name="text-input"/>
                    
                    </Col>
                  </FormGroup>            
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">etat</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input   defaultValue={this.state.etat} 
                      onChange={evenement=>this.setState({etat:evenement.target.value})}
                       type="text" id="text-input" name="text-input"/>
                    
                    </Col>
                  </FormGroup>
                 
            
        
                  

</Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.handelSubmit.bind(this)} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Envoyer</Button>
                <Button  onClick={this.reset.bind(this)} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Annuler</Button>
              </CardFooter>
            </Card>
            
          </Col>
         
        </Row>
      
      </div>
    );
  }
}

export default Forms;
