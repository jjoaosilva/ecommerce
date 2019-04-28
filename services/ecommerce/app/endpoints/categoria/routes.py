from app import app

from werkzeug.routing import Rule

app.add_url_rule('/criar-categoria'    , methods=['POST'], endpoint='/criar-categoria')
app.add_url_rule('/procurar-categorias', methods=['POST'], endpoint='/procurar-categorias')
app.add_url_rule('/deletar-categoria'  , methods=['POST'], endpoint='/deletar-categoria')
app.add_url_rule('/editar-categoria'   , methods=['POST'], endpoint='/editar-categoria')
