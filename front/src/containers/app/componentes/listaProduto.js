import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import DataTable from './dataTable';

import Servico from '../../services/servico';

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
            produtos: [],
            input: ""
        }
      }
    
    componentDidMount(){
        this.procurarProdutos()
    }

    async procurarProdutos (){
        const {data} = await Servico.post("/procurar-produtos",{nome:this.state.input});
        this.setState({
            data: data.payload
        })
        console.log(this.state.data)
    }

    handleClick = () => {
        this.procurarProdutos()
        this.setState({ isLoading: true })
    }
    
    deleteItens(item){
        console.log("deletar", item)
    }
    
    editarItens(item){
        console.log("editar", item)
    }


    render() {
      return (
                <div>
                    <FormGroup row>
                        <Col md="14">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">   
                                    <Button 
                                        size="lg" 
                                        type="button" 
                                        color="primary" 
                                        onClick={this.handleClick} 
                                    >
                                        <i className="fa fa-search" ></i> Pesquisar
                                    </Button>
                                </InputGroupAddon>
                                <Input size="lg" type="text" id="input1-group2" name="input1-group2" placeholder="Nome do Produto" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}/>
                            </InputGroup>
                        </Col>
                    </FormGroup>

                    <Col xs="12" lg="12">
            {this.state.isLoading && 
                 <DataTable
                 ref={ref => this.dataTable = ref}
                 columnData={columnData}
                 titleTable = "Produtos"
                 data={this.state.data}
                 deleteItens={this.deleteItens.bind(this)}
                 editarItens={this.editarItens.bind(this)}
               />
            }
          </Col>
                </div>
      );
    }
  }
  
  export default listaProduto;
  