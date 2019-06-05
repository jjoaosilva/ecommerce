import React, { Component } from 'react';
import ProductList from '../../componentes/productList';
import { UncontrolledTooltip, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Servico from '../../../services/servico';

const dados = [
  {
    nome : "Comedouro para Cachorros",
    descricao : "Os potes para cachorros da Zee.Dog são feitos de melamina para não acumularem bactéria, possuem base antiderrapante e estampas iradas. ",
    imagem : "https://zeedog.vteximg.com.br/arquivos/ids/171309/comedouro-para-cachorros_zigzag_zeedog_cachorro_pet_dk_1_main.png",
    categoria : "Cachorros"
  },
  {
    nome : "Guia para Cachorros",
    descricao : "A guia para cachorros Urban Helmets é uma edição especial da colab Zee.Dog + Urban Helmets, de tiragem limitada.",
    imagem : "https://zeedog.vteximg.com.br/arquivos/guia-para-cachorros-ubarn-helmets-old-school-zeedog-cachorro-pet-dk-1-descricao.png",
    categoria : "Cachorros"
  },
  {
    nome : "Guia para Cachorros",
    descricao : "A guia para cachorros Urban Helmets é uma edição especial da colab Zee.Dog + Urban Helmets, de tiragem limitada.",
    imagem : "https://zeedog.vteximg.com.br/arquivos/guia-para-cachorros-ubarn-helmets-old-school-zeedog-cachorro-pet-dk-1-descricao.png",
    categoria : "Cachorros"
  }
]


class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            render: false,
          };
        } 
    
    componentWillMount(){
        this.getProducts()
    }

    async getProducts (){
      const {data} = await Servico.get("/produto-por-categoria");
      this.setState({
          data: data.payload
      }, ()=>console.log(this.state.data))
    }   

    render() {
      return (
              <div>
                {Object.keys(this.state.data).map((categoria, index) =>
                  <div style={{margin: '10px'}}>
                    <ProductList
                        categoria={categoria}
                        products={this.state.data[categoria]}
                    />
                  </div>
                )}
              </div>
                
      );
    }
  }
  
  export default home;
  