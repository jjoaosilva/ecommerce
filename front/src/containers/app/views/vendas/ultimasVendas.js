import React, { Component } from 'react';
import ProductList from '../../componentes/productList';
        import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';
import Servico from '../../../services/servico';
import ItemVenda from '../../componentes/itemVenda';



class Vendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            render: false,
            accordion: [false, true, true],
            custom: [false, true],  
          };
        } 
    
    componentWillMount(){
        this.getVendas  ()
    }

    toggleAccordion(tab) {

        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            accordion: state,
        });
    }
        
    async getVendas (){
      const cliente = localStorage.getItem("user");
      const {data} = await Servico.post("/procurar-vendas", {cliente_id:cliente});
      this.setState({
          data: data.payload,
          render: true
      }, ()=>console.log(this.state.data))
    }   

    render() {
      return (
          
        <Col xl="12">
            {   this.state.render && 
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Suas Vendas 
                    </CardHeader>
                    <CardBody>
                        <div id="accordion">
                            {   
                                this.state.data.map((venda, index) => 
                                    <ItemVenda key={index} venda={venda}/>
                                )
                            }
                        </div>
                    </CardBody>
                </Card>
            }
        </Col>

      );
    }
  }
  
  export default Vendas;
  