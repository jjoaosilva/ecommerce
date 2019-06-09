from app import app

from werkzeug.routing import Rule

app.add_url_rule('/compra'    , methods=['POST'], endpoint='/compra')
app.add_url_rule('/procurar-vendas'    , methods=['POST'], endpoint='/procurar-vendas')