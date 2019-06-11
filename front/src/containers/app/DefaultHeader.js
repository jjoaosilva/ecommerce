import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink 
                style={{paddingRight: "20px"}}
                onClick={this.handleClick} 
                to = "" 
                className="nav-link">
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{marginRight: '5px'}}>
                      <Button 
                        type="button" 
                        color="primary" 
                        onClick={e => this.props.verCarrinho(e)} 
                      > Ver Carrinho</Button>
                    </div>
                    <div>
                      <Button 
                        type="button" 
                        color="primary"
                        onClick={e => this.props.onLogout(e)} 
                      > { (localStorage.getItem("user")||localStorage.getItem("func")) ? "Sair":"Login"}</Button>
                    </div>
                  </div>
            </NavLink>
                  
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
