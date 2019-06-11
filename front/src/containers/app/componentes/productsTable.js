import React, { Component } from 'react';
import { Alert,  InputGroup,InputGroupAddon,Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ProductsActions } from "../../../store/ducks/carrinho";
import Card2 from '@material-ui/core/Card';
import CardMedia2 from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import TableItem from './tableItem'
import Servico from '../../services/servico';

var styles = theme => ({
    card: {
      maxWidth: 320,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });

class ProductTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        produtos: [],
        render: false,
        quantidade_total: 0,
        preco_total: 0,
        dangerAlert: false,
        successAlert: false,
        mensageAlert: ""
        };
    }

    att_footer(carrinho){
      var quantidade_total= 0  
      var preco_total = 0

      carrinho.map(product => {
        quantidade_total = quantidade_total + product.product_quantidade;
        preco_total = preco_total + product.product_quantidade*product.product_preco
      })

      this.setState({
        quantidade_total,
        preco_total,
      })
    }

    componentWillMount(){
      this.att_footer(this.props.carrinho)
    }
    componentWillReceiveProps(nextProps){
      this.att_footer(nextProps.carrinho)
    }

    rmv = id => {
      this.props.rmvProduct({
        product_id: id,
        product_quantidade: 1,
      });
    }
  
    handleSubmit = product => {
      this.props.addProduct({
        product_id: product.product_id,
        product_preco: product.product_preco,
        product_quantidade: 1,
      });
    }; 

    async finalizarCompra (){
      const cliente = localStorage.getItem("user");
      if(cliente){
        const lista = []
        this.props.carrinho.map(product=>
                                product.product_quantidade !=0 ? 
                                lista.push({
                                  quantidade   : product.product_quantidade, 
                                  valor_unidade: product.product_preco, 
                                  produto_id   : product.product_id
                                })
                                :null)
        const {data} = await Servico.post("/compra",
                  {
                    valor: this.state.preco_total,
                    cliente_id: cliente,
                    itens: lista
                  }
        );
        this.setState({
          mensageAlert: data['mensagem']
        }, () => {
                  this.showAlert(data['status'])
                  if(data['status']){
                    this.props.clearProduct()
                  }
              })
      }else{
        this.setState({
          mensageAlert: "Efetue login ou cadastro antes da compra!"
        }, () => {
                  this.showAlert(false)

              })
      }
      
      
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
      const { classes } = this.props;
      return (
        <Col xs="12" lg="12">
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
            {   this.props.carrinho.length!=0 ?
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> {this.props.titleTable}
                    </CardHeader>
                    <CardBody>
                        <Table responsive bordered>
                        <thead>
                            <tr>
                                {this.props.columnData.map((column, index) =>
                                        <th key={index}>{column['name']}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.carrinho.map((item, index) =>
                                    <TableItem
                                      index={index}
                                      item={item}
                                      handleSubmit = {this.handleSubmit}
                                      rmv = {this.rmv}
                                    />
                                    )}
                                    <td>
                                        <span>
                                            Total
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                          {this.state.quantidade_total}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            -
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                          R${this.state.preco_total},00
                                        </span>
                                    </td>
                        </tbody>
                        </Table>
                    </CardBody>
                     <Button onClick={()=>this.finalizarCompra()}block color="primary">Finalizar Compra</Button>
                </Card>
                :
                <h1>Carrinho vazio :(</h1>
            }
          </Col>

      );
    }
  }
  
  ProductTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    carrinho: state.carrinho
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(ProductsActions, dispatch);
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ProductTable));