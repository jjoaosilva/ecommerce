export default localStorage.getItem("func") ? 
{
  items: [
    {
      name: 'Produtos',
      url: '/listaProdutos',
      icon: 'cui-basket-loaded',
    },
    {
      name: 'Categorias',
      url: '/listaCategoria',
      icon: 'cui-tags',
    },
    {
      name: 'Funcionarios',
      url: '/listaFuncionario',
      icon: 'fa fa-address-card-o',
    },
    {
      name: 'Clientes',
      url: '/listaCliente',
      icon: 'cui-user',
    },
    {
      name: 'Home',
      url: '/home',
      icon: 'cui-basket-loaded',
    },
    {
      name: 'Suas Vendas',
      url: '/vendas',
      icon: 'cui-credit-card',
    },
  ],
}:( localStorage.getItem("user") ?
    {items: [
      {
        name: 'Home',
        url: '/home',
        icon: 'cui-basket-loaded',
      },
      {
        name: 'Suas Vendas',
        url: '/vendas',
        icon: 'cui-credit-card',
      },
      {
        name: 'Alterar Dados Pessoais',
        url: '/editarDados',
        icon: 'cui-cog',
      },
    ],}
    :
  {items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'cui-basket-loaded',
    },
  ],}
)
{
  
}
