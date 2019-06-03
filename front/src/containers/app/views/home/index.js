import React, { Component } from 'react';
import ProductCard from '../../componentes/productCard';
import { UncontrolledTooltip, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
          };
        }


    render() {
      return (
                <div style = {{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  alignContent: 'center'
                }}>
                  <ProductCard
                    style = {{flex: 1, padding: '10px'}}
                    nome = {"Comedouro para Cachorros"}
                    descricao = {"Os potes para cachorros da Zee.Dog são feitos de melamina para não acumularem bactéria, possuem base antiderrapante e estampas iradas. "}
                    imagem = {"https://zeedog.vteximg.com.br/arquivos/ids/171309/comedouro-para-cachorros_zigzag_zeedog_cachorro_pet_dk_1_main.png"}
                    categoria = {"Cachorros"}
                  />
                  <ProductCard
                    style = {{flex: 1}}
                    nome = {"Guia para Cachorros"}
                    descricao = {"A guia para cachorros Urban Helmets é uma edição especial da colab Zee.Dog + Urban Helmets, de tiragem limitada."}
                    imagem = {"https://zeedog.vteximg.com.br/arquivos/guia-para-cachorros-ubarn-helmets-old-school-zeedog-cachorro-pet-dk-1-descricao.png"}
                    categoria = {"Cachorros"}
                  />
                  <ProductCard
                    style = {{flex: 1}}
                    nome = {"Cama para Cachorros GoT"}
                    descricao = {"A cama para cachorros Zee.Bed Game of Thrones™ é uma edição especial da colab Zee.Dog + Game of Thrones™, de tiragem limitada."}
                    imagem = {"https://zeedog.vteximg.com.br/arquivos/ids/173521/cama-para-cachorros-game-of-thrones-got-zeebed-vacuo-nasa-cachorro-pet-main.png"}
                    categoria = {"Cachorros"}
                  />
                </div>
      );
    }
  }
  
  export default home;
  