import React, { Component } from 'react';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import DataTable from '../../componentes/dataTable';
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

const columnData = [
                        {"name": "Nome"     , "id":"nome"}, 
                        {"name": "Descrição", "id":"descricao"}, 
                        {"name": "Preço"    , "id":"preco"}, 
                        {"name": "Categoria", "id":"categoria"},    
                        {"name": ""         , "id":"editar"}
                  ];

class listaProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            produtosSelecionado: null,
            input: "", 
            modal: false,
            danger: false,
            modalText: "",
            data: null,
            dangerAlert: false,
            successAlert: false,
            mensageAlert: ""
          };

          this.toggleDanger = this.toggleDanger.bind(this);
        }
      
    toggleDanger() {
        this.setState({
        danger: !this.state.danger,
        });
    }
      
    componentDidMount(){
        this.procurarProdutos()
    }

    async procurarProdutos (){
        const {data} = await Servico.post("/procurar-produtos",{nome:this.state.input});
        this.setState({
            data: data.payload
        })
    }

    async deletar (){
        console.log("state: ", this.state)
        const {data} = await Servico.post("/deletar-produto",{id: this.state.produtosSelecionado['id']});
        this.setState({
            mensageAlert: data['mensagem']
        }, () => {
                    this.showAlert(data['status'])
                    this.procurarProdutos()
                })
    }

    handleClick = () => {
        this.procurarProdutos()
        this.setState({ isLoading: true })
    }
    
    formatModalText(){
        this.setState({
            modalText: "Produto: " + this.state.produtosSelecionado['nome']
        })
    }

    deleteItens(item){
        this.setState({
            produtosSelecionado: item
        }, () =>  {
                    this.formatModalText()
                    this.toggleDanger()
                  })
    }
    
    editarItens(item){
        console.log('Editar')
        return(<Redirect to={{pathname: '/editarProduto', state: item }} />)
    }

    showAlert(alert){ 
        this.toggleDanger()
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
                        <CardBody>
                            <Col xs="3" md="3" style={{ paddingBottom: "20px" }}>
                                <Link style={{ textDecoration: 'none' }} to={{pathname: '/criarProduto', state: this.state }}>
                                    <Button color="primary" size="lg" block><span>Novo Produto</span></Button>  
                                </Link>     
                            </Col>  

                            <Col xs="12" md="6">
                                <FormGroup row>
                                    <Col md="12">
                                    <InputGroup>
                                    <Input size="lg" type="text" id="input1-group2" name="input1-group2" placeholder="Nome do Produto" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}/>
                                        <InputGroupAddon addonType="append">
                                        <Button type="button" color="primary" onClick={this.handleClick} >Pesquisar</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </Col>
                                </FormGroup>
                            </Col>           

                            <Col xs="12" lg="12" md="6" style={{ paddingTop: "20px" }}>
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
                                
                                {this.state.isLoading && 
                                    <DataTable
                                        ref={ref => this.dataTable = ref}
                                        columnData={columnData}
                                        titleTable = "Produtos"
                                        data={this.state.data}
                                        deleteItens={this.deleteItens.bind(this)}
                                        editPath={"/editarProduto"}
                                    />
                                }
                            </Col>

                            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                className={'modal-danger ' + this.props.className}
                            >
                                <ModalHeader toggle={this.toggleDanger}>Deletar Produto</ModalHeader>
                                <ModalBody>
                                    <Col>
                                        <div>Você Realmente quer deletar? Esta ação não poderá ser desfeita!</div>
                                        <div>{this.state.modalText}</div>
                                    </Col>
                                </ModalBody>
                                <ModalFooter>
                                <Button color="danger" onClick={this.deletar.bind(this)}>Deletar</Button>{' '}
                                <Button color="secondary" onClick={this.toggleDanger}>Cancelar</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                  </Col> 
                </div>
      );
    }
  }
  
  export default listaProduto;
  