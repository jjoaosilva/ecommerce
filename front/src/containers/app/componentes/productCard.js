import React, { Component } from 'react';
import {
    Button,
    Col,
  } from 'reactstrap';

class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            imagem: "",
            categoria: ""
          };
        }

     componentWillMount(){
        this.setState({
            nome: this.props.nome,
            descricao: this.props.descricao,
            imagem: this.props.imagem,
            categoria: this.props.categoria
        })
     }

    render() {
      return (
                <div>
                  <div class="card" style={{width: "18rem"}}>
                    <Col>
                        <div style={{width: "18rem", height: "18rem"}}>
                            <img 
                                style={{width: "16", height: "16"}}
                                alt="teste"
                                src={this.state.imagem}
                            />
                        </div>
                    
                        <div class="card-body">
                            <h5 class="card-title">{this.state.nome}</h5>
                            <p class="card-text">{this.state.descricao}</p>
                            <Button class="btn btn-primary">{this.state.categoria}</Button>
                        </div>
                    </Col>
                  </div>
                </div>
      );
    }
  }
  
  export default ProductCard;
  