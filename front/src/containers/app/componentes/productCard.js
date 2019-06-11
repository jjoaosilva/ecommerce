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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ProductsActions } from "../../../store/ducks/carrinho";

// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icon/MoreVert';

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

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentWillMount(){
    console.log("Product card: ", this.props)
  }

  rmv = product => {
    this.props.rmvProduct({
      product_id: this.props.product.id,
      product_preco: this.props.product.preco,
      product_quantidade: 1,
    });
  }

  handleSubmit = product => {
    this.props.addProduct({
      product_id: this.props.product.id,
      product_preco: this.props.product.preco,
      product_quantidade: 1,
    });
  };  

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.nome}
          subheader={`Categoria: ${this.props.categoria}`}
        />
        <CardMedia
          className={classes.media}
          image={this.props.imagem}
          title={this.props.nome} 
        />
        <CardContent>
          <Typography component="p">
            {this.props.descricao}
          </Typography>
        </CardContent>
        <CardActions 
             
            className={classes.actions} disableActionSpacing
        >
          <div>
            <Button onClick={this.handleSubmit} color="primary" size="s" ><span>Adicionar ao Carrinho</span></Button>  
          </div>

          <div style={{paddingLeft: '5px'}}>
            <Button onClick={this.rmv} color="primary" size="s" ><span>Comprar</span></Button>  
          </div>
 
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
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
)(withStyles(styles)(RecipeReviewCard));
