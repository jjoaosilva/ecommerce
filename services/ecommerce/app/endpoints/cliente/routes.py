from app import app

from werkzeug.routing import Rule

app.add_url_rule('/criar-cliente'    , methods=['POST'], endpoint='/criar-cliente')
app.add_url_rule('/procurar-clientes', methods=['POST'], endpoint='/procurar-clientes')
app.add_url_rule('/deletar-cliente'  , methods=['POST'], endpoint='/deletar-cliente')
app.add_url_rule('/editar-cliente'   , methods=['POST'], endpoint='/editar-cliente')
