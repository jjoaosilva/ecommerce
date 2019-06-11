import React from 'react';

const listaProduto = React.lazy(() => import('./containers/app/views/produto/listaProduto'));
const editarProduto = React.lazy(() => import('./containers/app/views/produto/editarProduto'));
const criarProduto = React.lazy(() => import('./containers/app/views/produto/criarProduto'));

const listaCategoria = React.lazy(() => import('./containers/app/views/categoria/listaCategoria'));
const editarCategoria = React.lazy(() => import('./containers/app/views/categoria/editarCategoria'));
const criarCategoria = React.lazy(() => import('./containers/app/views/categoria/criarCategoria'));

const listaFuncionario = React.lazy(() => import('./containers/app/views/funcionario/listaFuncionario'));
const editarFuncionario = React.lazy(() => import('./containers/app/views/funcionario/editarFuncionario'));
const criarFuncionario = React.lazy(() => import('./containers/app/views/funcionario/criarFuncionario'));


const listaCliente = React.lazy(() => import('./containers/app/views/cliente/listaCliente'));
const editarCliente = React.lazy(() => import('./containers/app/views/cliente/editarCliente'));
const criarCliente = React.lazy(() => import('./containers/app/views/cliente/criarCliente'));

const home = React.lazy(() => import('./containers/app/views/home/index'));
const ultimasVendas = React.lazy(() => import('./containers/app/views/vendas/ultimasVendas'));
const carrinho = React.lazy(() => import('./containers/app/views/vendas/carrinho'));
const editarDados = React.lazy(() => import('./containers/app/views/user/editarDados'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: home },
  { path: '/carrinho', name: 'Carrinho', component: carrinho },
  { path: '/vendas', name: 'Suas Vendas', component: ultimasVendas },
  { path: '/editarDados', name: 'Alterar Dados Pessoais', component: editarDados },

  { path: '/listaProdutos', name: 'Produtos', component: listaProduto },
  { path: '/editarProduto/:produto', name: 'Produtos', component: editarProduto },
  { path: '/criarProduto', name: 'Produtos', component: criarProduto },

  { path: '/listaCategoria', name: 'Categorias', component: listaCategoria },
  { path: '/editarCategoria/:categoria', name: 'Categorias', component: editarCategoria },
  { path: '/criarCategoria', name: 'Categorias', component: criarCategoria },

  { path: '/listaFuncionario', name: 'Funcinarios', component: listaFuncionario },
  { path: '/editarFuncionario/:funcionario', name: 'Funcinarios', component: editarFuncionario },
  { path: '/criarFuncionario', name: 'Funcinarios', component: criarFuncionario },

  { path: '/listaCliente', name: 'Clientes', component: listaCliente },
  { path: '/editarCliente/:cliente', name: 'Clientes', component: editarCliente },
  { path: '/criarCliente', name: 'Clientes', component: criarCliente },
];

export default routes;
