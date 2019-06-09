import React, { Component } from 'react';
import ProductTable from '../../componentes/productsTable';

const columnData = [
    {"name": "Produto"       , "id":"Produto"}, 
    {"name": "Quantidade"    , "id":"Quantidade"}, 
    {"name": "Preço Unidade" , "id":"Preço Unidade"},   
    {"name": "Preço Total"   , "id":"Preço Total"}, 
];

class Carrinho extends Component {


    render() {
      return (
          
        <ProductTable
            columnData={columnData}
            titleTable = "Carrinho de Compras"
        />

      );
    }
  }
  
  export default Carrinho;
  