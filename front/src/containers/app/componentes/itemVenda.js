import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';




class ItemVenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accordion: [false, true, true],
            custom: [false, true],  
          };
        } 
    
    toggleAccordion(tab) {

        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            accordion: state,
        });
    }
        
    render() {
      return (
            <Card style={{margin: '10px'}} className="mb-0">
                <CardHeader id="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                    <Row>
                        <h5 className="m-0 p-0">Data:&nbsp;{this.props.venda.data}</h5>
                        <h5 className="m-0 p-0">&nbsp;Valor:&nbsp;R${this.props.venda.valor}</h5>
                    </Row>
                </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                {
                    this.props.venda.itens.map((item, key)=>
                        <CardBody key={key}>
                            Produto:&nbsp;{item.produto_id}<br/>
                            Quantidade:&nbsp;{item.quantidade}<br/>
                            Valor da unidade:&nbsp;R${item.valor_unidade}
                        </CardBody>
                    )
                }                                        
                </Collapse>
            </Card>
      );
    }
  }
  
  export default ItemVenda;
  