import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormText,Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
class Login extends Component {
  constructor() {
    super();
    this.state = {
    email: "",
    password: "",
    emailErr: "",
    passwordErr: "",
    erreur:false
    }
  }
  login() {
    let err = this.validate();
    if (!err) {
      console.log("state ", this.state);
      axios.post("http://localhost:3017/medecin/authentification", {
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          console.log("respose", res.data);
          if (res.data['status'] === "error") {
            alert(" verifier votre login ou password")
          }
          else {
            alert("Done ! ");
            window.location.href = "/#/home"
          }
        })
    }
  }
  validate = () => {
    let isError = false;
    const errors = {
      emailErr: "",
      passwordErr: "",
    }
    console.log("login ",this.state.email);
    console.log("pws ",this.state.password);
    const regex1=/^[a-zA-Z0-9._-]+$/;
    if ((this.state.email==="")||(this.state.email.length > 30)) {
      isError = true;
      errors.emailErr = "Veuillez verifier votre email";
    }
    if ((this.state.password==="")||(this.state.password.length > 20)) {
      isError = true;
      errors.passwordErr = "veuillez verifier votre mot de passe";
    }
    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }
    console.log("errrr ", isError)
    this.setState({
      erreur:isError
    })
    return isError;
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Connexion</h1><p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" autoComplete="username" value={this.state.email}
                               onChange={evt => this.setState({email: evt.target.value})}/>
                        {
                          this.state.erreur===false ?
                            <FormText >{this.state.emailErr}</FormText>:null
                        }
                        {
                          this.state.erreur===true ?
                            <FormText style ={{backgroundColor:"red"}}>{this.state.emailErr}</FormText>:null
                        }
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="password"  autoComplete="username" value={this.state.password}
                               onChange={event => this.setState({password: event.target.value})}/>
                        {
                          this.state.erreur===false ?
                            <FormText >{this.state.passwordErr}</FormText>:null
                        }
                        {
                          this.state.erreur===true ?
                            <FormText style ={{backgroundColor:"red"}}>{this.state.passwordErr}</FormText>:null
                        }
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4"
                                  onClick={this.login.bind(this)}> Connecter </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;