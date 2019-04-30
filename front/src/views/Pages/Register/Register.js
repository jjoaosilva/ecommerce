import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Auth from '../../../containers/services/auth';
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
        nome: "",
        email:"",
        senha: "",
        confirmarSenha:"",
        dangerAlert: false,
        successAlert: false,
        mensageAlert: ""
      };
    }

    async criarCliente (){
      if(this.state.senha == this.state.confirmarSenha){
        const {data} = await Auth.post("/criar-cliente",{nome:this.state.nome, login: this.state.email, senha: this.state.senha});
        this.setState({
          mensageAlert: data['mensagem']
        }, () => {
                  this.showAlert(data['status'])
                  this.setState({
                    nome: "",
                    login: "",
                    senha: "",
                  })
              })
        }else{
          this.setState({
            mensageAlert: "Confira sua senha!!!"
          }, () => {
                    this.showAlert(false)
                    this.setState({
                      nome: "",
                      login: "",
                      senha: "",
                    })
                })
        }
  
    }
    
    showAlert(alert){ 
      if(alert){
          this.setState({
              successAlert: true
          }, () => setTimeout(() => this.setState({successAlert: false}), 5000))
      }else{
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
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {this.state.successAlert && 
                      <Alert color="success">
                          {this.state.mensageAlert}
                      </Alert>
                  }
                  {this.state.dangerAlert && 
                      <Alert color="danger">
                          {this.state.mensageAlert}
                      </Alert>
                  }
                  <Form>
                    <h1>Registrar</h1>
                    <p className="text-muted">Crie sua conta</p>
 
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome" autoComplete="username"  value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/>
                    </InputGroup>
 
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email"  value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Senha" autoComplete="new-password"  value={this.state.senha} onChange={(event) => this.setState({senha: event.target.value})}/>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repita sua senha" autoComplete="new-password"  value={this.state.confirmarSenha} onChange={(event) => this.setState({confirmarSenha: event.target.value})}/>
                    </InputGroup>

                    <Button onClick={this.criarCliente.bind(this)} color="success" block>Inscreva-se</Button>
                    <Link to="/login">
                      <Button color="light" className="mt-3" block >Voltar</Button>
                    </Link>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
