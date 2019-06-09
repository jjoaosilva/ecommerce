from app import db
from app.models.venda.Venda import * 

import sqlalchemy

class VendaDAO:
    
    def __init__(self):
        pass

    def create(self, data, valor, cliente_login):

        venda = Venda(data, valor, cliente_login)
        db.session.add(venda)
        db.session.commit()

        return venda
   
    def read(self, cliente_login):

        sql = 'SELECT * FROM vendas WHERE cliente_login ilike \'{cliente_login}\' '.format(cliente_login=cliente_login)
     
        con = db.engine.connect()
        vendas = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return vendas

