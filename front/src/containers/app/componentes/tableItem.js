import React, { Component } from 'react';
import { Input,  InputGroup,InputGroupAddon,Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

class TableItem extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            id: null,
            quantidade: null,
            preco: null,
            url: null,
            nome:null,
        };
    }

    async getProduct (item){
        const {data} = await Servico.post("/get-produto-id",{id:item.product_id});
        this.setState({
            id: data.payload.id,
            url: data.payload.url,
            nome:data.payload.nome,
            quantidade: item.product_quantidade,
            preco: item.product_preco,
        }, ()=>this.setState({render: true}))
    }

    componentWillMount(){
        this.getProduct(this.props.item)
    }
    
    componentWillReceiveProps(nextProps){
        if(this.state.id == nextProps.item.product_id){
            this.setState({ 
                            quantidade: nextProps.item.product_quantidade,
                        })
        }
    }

    render() {
      const { classes } = this.props;
      return (
            <tr key={this.props.index}>
                <td>
                    <Col xs="12" md="12" >
                        <Card2 className={classes.card}>    
                            <CardMedia2
                                className={classes.media}
                                image={this.state.url}
                            />  
                            <CardContent>
                                <Typography component="p">
                                {this.state.nome}
                                </Typography>
                            </CardContent>
                        </Card2>    
                    </Col>
                </td>
                <td>
                    <span>
                        <Col md="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <Button 
                                onClick={()=>this.props.rmv(this.state.id)} 
                                type="button" 
                                color="secondary">
                                <i style={{color:'white'}} className="fa fa-minus"></i>
                            </Button>
                            </InputGroupAddon>
                            <Input type="text" 
                                    id="input3-group1" 
                                    name="input3-group1" 
                                    value={this.state.quantidade}
                            />
                            <InputGroupAddon addonType="append">
                            <Button 
                                onClick={()=>this.props.handleSubmit({ product_id: this.state.id, 
                                                                 product_preco: this.state.preco })}
                                type="button" 
                                color="secondary">
                                    <i style={{color:'white'}} className="fa fa-plus"></i>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        </Col>
                    </span>
                </td>
                <td>
                    <span>
                        R${this.state.preco},00
                    </span>
                </td>
                <td>
                    <span>
                        R${this.state.preco*this.state.quantidade},00
                    </span>
                </td>
            </tr>
      );
    }
  }
  
  TableItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TableItem);