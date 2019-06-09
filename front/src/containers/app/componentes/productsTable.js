import React, { Component } from 'react';
import { Tooltip, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ProductsActions } from "../../../store/ducks/carrinho";
import Servico from '../../services/servico';
import Card2 from '@material-ui/core/Card';
import CardMedia2 from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

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
        render: false
        };
    }

    async getProduct (product_id){
        const {data} = await Servico.post("/get-produto-id",{id:product_id});
        var produtos = this.state.produtos
        produtos.push(data.payload)
        this.setState({
            produtos
        }, ()=>this.setState({render: true}))
    }

    componentWillMount(){

        for(var i = 0; i < this.props.carrinho.itens.length; i++){
            this.getProduct(this.props.carrinho.itens[i].product_id)
        }
        
    }
    render() {
      const { classes } = this.props;
      return (
        <Col xs="12" lg="12">
            {   this.state.render &&
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
                            {this.state.produtos.map((item, index) =>
                                    <tr key={index}>
                                        <td>
                                            <Col xs="12" md="12" style={{marginRight: '-180px'}}>
                                                <Card2 className={classes.card}>    
                                                    <CardMedia2
                                                        className={classes.media}
                                                        image={this.state.produtos[index].url}
                                                    />  
                                                    <CardContent>
                                                      <Typography component="p">
                                                        {this.state.produtos[index].nome}
                                                      </Typography>
                                                    </CardContent>
                                                </Card2>    
                                            </Col>
                                        </td>
                                        <td>
                                            <span>
                                                {this.props.carrinho.itens[index].product_quantidade}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                R${this.props.carrinho.itens[index].product_preco}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                R${this.props.carrinho.itens[index].product_preco*this.props.carrinho.itens[index].product_quantidade}
                                            </span>
                                        </td>
                                    </tr>
                                    )}
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>
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