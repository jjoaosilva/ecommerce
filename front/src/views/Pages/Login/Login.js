import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import Auth from '../../../containers/services/auth';
class Login extends Component {

constructor(props) {
  super(props);
  this.state = {
      login: "",
      senha: "",
      dangerAlert: false,
      mensageAlert: ""
    };
  }

  async login (){
    const {data} = await Auth.post("/login-cliente",{login:this.state.login, senha:this.state.senha});
    this.setState({
      mensageAlert: data['mensagem']
      }, () => {
              this.showAlert(data['status'])
              this.acessToken(data['status'], data['payload'])
      })
  }

  acessToken = (status, user) => {
    if(status){
      localStorage.setItem('user', user['login']);
      window.location.replace("/");
    }
  }

  showAlert(alert){ 
    if(!alert){
        this.setState({
            dangerAlert: true
        }, () => setTimeout(() => this.setState({dangerAlert: false}), 5000))           
    }
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
                    {this.state.dangerAlert && 
                        <Alert color="danger">
                            {this.state.mensageAlert}
                        </Alert>
                    }
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Faça login em sua conta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="username" value={this.state.login} onChange={(event) => this.setState({login: event.target.value})}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Senha" autoComplete="current-password" value={this.state.senha} onChange={(event) => this.setState({senha: event.target.value})}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        {/* <Link to="/"> */}
                          <Button onClick={this.login.bind(this)} color="primary" className="px-4">Entrar</Button>
                        {/* </Link> */}
                          
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Abra uma conta</h2>
                      <p style={{paddingTop: "15px", paddingBottom: "40px"}} >Perfeito para seu dia a dia.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Inscreva-se</Button>
                      </Link>
                    </div>
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