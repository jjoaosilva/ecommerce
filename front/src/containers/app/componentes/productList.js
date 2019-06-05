import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { Button } from 'reactstrap';
import ProductCard from './productCard';
import { Col, Row } from 'reactstrap';

class ProductList extends React.Component {

    componentWillMount(){
        console.log('componentWillMount', this.props)
    }
    render(){
        return (
            <div>
                <Col xs="12" md="12">
                    <Card style={{ paddingTop:'10px', paddingLeft:'5px',paddingRight:'5px'}}>   
                        <div style={{display:'flex', flexDirection: 'row'}}>
                            <h1 style={{flex: 1, padding: '10px'}}>{this.props.categoria}</h1>
                            
                            <div style={{padding: '10px'}}>
                                <Button color="primary" size="s" ><span>Ver mais</span></Button>  
                            </div>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',   
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            paddingBottom: '10px'
                        }}>
                        {this.props.products.map((product, index) =>
                            <ProductCard
                                key={index}
                                style = {{flex: 1}}
                                nome = {product.nome}
                                descricao = {product.descricao}
                                imagem = {product.imagem}
                                categoria = {product.categoria}
                            />
                        )}
                        </div>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default ProductList;