import React, { Component } from 'react';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import Servico from '../../../services/servico';

import {
    Button,
    CardFooter,
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
    Label
  } from 'reactstrap';


class editarCategoria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            nome: "",
            descricao: "",
            dangerAlert: false,
            successAlert: false,
            mensageAlert: "",
            render: false
          };
        }
    
    componentWillMount(){
      const categoria = JSON.parse(atob(this.props.match.params.categoria));

      if(categoria){
        this.setState({
          id:categoria['id']
        }, ()=>this.getCategoria())
      }
    }
    
    async getCategoria (){
      const {data} = await Servico.post("/get-categoria-id",{id:this.state.id});
      this.setState({
            nome: data.payload.nome,
            descricao: data.payload.descricao,
      }, () => this.setState({render: true}))
    }

    async editarCategoria (){
        const {data} = await Servico.post("/editar-categoria",{
                id:this.props.location.props.item['id'],
                nome:this.state.nome, 
                descricao: this.state.descricao,
        });
        this.setState({
        mensageAlert: data['mensagem']
        }, () => {
                    this.showAlert(data['status'])
                    this.setState({
                      nome: "",
                      descricao: "",
                    })
                })
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
                <div>
                  { this.state.render &&
                  <Col xs="12" md="12">
                    <Card>
                      <CardBody><Col xs="3" md="3" style={{ paddingBottom: "20px" }}>
                        <h2>Editar Categoria</h2>
                        </Col> 

                        <Col xs="12" md="12">
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
                        </Col>
                        <Row>                          
                          <Col xs="12" md="6">
                            <FormGroup>
                              <Label htmlFor="nome">Nome</Label>
                              <Input type="text" id="nome" placeholder="Nome da Categoria" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor="descricao">Descrição</Label>
                              <Input type="textarea" id="descricao" placeholder="Descrição da Categoria" value={this.state.descricao} onChange={(event) => this.setState({descricao: event.target.value})}/>
                            </FormGroup>

                          </Col>
                        </Row>

                        <div className="form-actions">
                          <Button onClick={this.editarCategoria.bind(this)} type="submit" color="primary">Salvar</Button>
                          <Link style={{ textDecoration: 'none' }} to={{pathname: '/listaCategoria', state: this.state }}>
                            <Button color="secondary">Voltar</Button> 
                          </Link>  
                          
                        </div>
                      </CardBody>
                    </Card>
                  </Col> }
                </div>
      );
    }
  }
  
  export default editarCategoria;
  