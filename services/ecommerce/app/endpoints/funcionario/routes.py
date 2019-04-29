from app import app

from werkzeug.routing import Rule

app.add_url_rule('/criar-funcionario'    , methods=['POST'], endpoint='/criar-funcionario')
app.add_url_rule('/procurar-funcionarios', methods=['POST'], endpoint='/procurar-funcionarios')
app.add_url_rule('/deletar-funcionario'  , methods=['POST'], endpoint='/deletar-funcionario')
app.add_url_rule('/editar-funcionario'   , methods=['POST'], endpoint='/editar-funcionario')
app.add_url_rule('/login-funcionario'   , methods=['POST'], endpoint='/login-funcionario')
