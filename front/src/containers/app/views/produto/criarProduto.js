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


class criarProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            categoria: null,
            nome: "",
            descricao: "",
            preco: null,
            categoriaSelecionada: null,
            dangerAlert: false,
            successAlert: false,
            mensageAlert: ""
          };
        }
    
    componentWillMount(){
      this.procurarCategorias()
    }

    async procurarCategorias (){
      const {data} = await Servico.post("/procurar-categorias",{nome:""});
      this.setState({
        categoria: data.payload
      })
    }

    async criarProdutos (){
      const {data} = await Servico.post("/criar-produto",{nome:this.state.nome, descricao: this.state.descricao, preco: this.state.preco, categoria_id: this.state.categoriaSelecionada});
      this.setState({
        mensageAlert: data['mensagem']
    }, () => {
                this.showAlert(data['status'])
                this.setState({
                  nome: "",
                  descricao: "",
                  preco: "",
                  categoriaSelecionada: null,
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
                  <Col xs="12" md="12">
                    <Card>
                      <CardBody><Col xs="3" md="3" style={{ paddingBottom: "20px" }}>
                        <h2>Novo Produto</h2>
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
                              <Input type="text" id="nome" placeholder="Nome do Produto" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor="descricao">Descrição</Label>
                              <Input type="textarea" id="descricao" placeholder="Descrição do Produto" value={this.state.descricao} onChange={(event) => this.setState({descricao: event.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor="preco">Preço</Label>
                              <Input type="text" id="preco" placeholder="Preco do Produto: somente numeros" value={this.state.preco} onChange={(event) => this.setState({preco: event.target.value})}/>
                            </FormGroup>
                          </Col>
                          <Col xs="12" md="6">
                            <FormGroup>
                              <Col md="3">
                                <Label htmlFor="Categorias">Categorias</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" value={this.state.categoriaSelecionada} onChange={(event) => this.setState({categoriaSelecionada: event.target.value})}>
                                  <option>Categoria</option>
                                  { this.state.categoria != null ? 
                                    this.state.categoria.map((categoria, id) => 
                                    <option key={id} value={categoria['id']}>{categoria['nome']}</option>
                                  ): null}
                                </Input>
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>

                        <div className="form-actions">
                          <Button onClick={this.criarProdutos.bind(this)} type="submit" color="primary">Salvar</Button>
                          <Link style={{ textDecoration: 'none' }} to={{pathname: '/listaProdutos', state: this.state }}>
                            <Button color="secondary">Voltar</Button> 
                          </Link>  
                          
                        </div>
                      </CardBody>
                    </Card>
                  </Col> 
                </div>
      );
    }
  }
  
  export default criarProduto;
  