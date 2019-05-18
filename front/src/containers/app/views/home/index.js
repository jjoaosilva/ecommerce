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
                <div>
                  {/* <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}> */}
                  <Row>
                    <div style={{  display: 'flex', justifyContent: 'center', backgroundColor: 'red', width: "18rem", height: "300px",  minWidth: 0, margin: "5px"}}>
                      <img style={{width: '100%', height: '100%'}}
                      src="https://assets.xtechcommerce.com/uploads/images/medium/9cd410db4191aaa27c47c148bffa57cd.jpg"/>
                    </div>
                    
                    <div style={{ backgroundColor: 'red', width: "18rem", height: "300px",  minWidth: 0, margin: "5px"}}>
                      <img style={{width: '100%', height: '100%'}}
                      src="https://static.netshoes.com.br/produtos/camisa-corinthians-i-1920-sn-estadio-nike-masculina/28/HZM-1536-028/HZM-1536-028_detalhe1.jpg"/>
                    </div>
                    
                    <div style={{ backgroundColor: 'red', width: "18rem", height: "300px",  minWidth: 0, margin: "5px"}}>
                      <img style={{width: '100%', height: '100%'}}
                      src="https://static.netshoes.com.br/produtos/camiseta-nike-legend-20-ss-masculina/40/D12-2415-440/D12-2415-440_detalhe1.jpg"/>
                    </div>
                    </Row>
                  {/* </section> */}

                  {/* <Row>
                  <ProductCard
                    nome = {"Camisa Juventus"}
                    descricao = {"Ótima qualidade."}
                    imagem = {"https://assets.xtechcommerce.com/uploads/images/medium/9cd410db4191aaa27c47c148bffa57cd.jpg"}
                    categoria = {"Camisas"}
                  />
                  <ProductCard
                  nome = {"Camisa Juventus"}
                  descricao = {"Ótima qualidade."}
                  imagem = {"https://assets.xtechcommerce.com/uploads/images/medium/9cd410db4191aaa27c47c148bffa57cd.jpg"}
                  categoria = {"Camisas"}
                />
                <ProductCard
                    nome = {"Camisa Juventus"}
                    descricao = {"Ótima qualidade."}
                    imagem = {"https://assets.xtechcommerce.com/uploads/images/medium/9cd410db4191aaa27c47c148bffa57cd.jpg"}
                    categoria = {"Camisas"}
                  />
                  <ProductCard
                      nome = {"Camisa Juventus"}
                      descricao = {"Ótima qualidade."}
                      imagem = {"https://assets.xtechcommerce.com/uploads/images/medium/9cd410db4191aaa27c47c148bffa57cd.jpg"}
                      categoria = {"Camisas"}
                    />
                  </Row> */}
                </div>
      );
    }
  }
  
  export default home;
  