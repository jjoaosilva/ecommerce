from app import db
from app.models.item.Item import * 

import sqlalchemy

class ItemDAO:
    
    def __init__(self):
        pass

    def create(self, quantidade, valor_unidade, produto_id, venda_id):

        item = Item(quantidade, valor_unidade, produto_id, venda_id)
        db.session.add(item)
        db.session.commit()

        return {"quantidade": item.quantidade, 
                "valor_unidade": item.valor_unidade, 
                "produto_id": item.produto_id, 
                "venda_id":item.venda_id}
   
    def read(self, venda_id):

        sql = """SELECT itens.quantidade, itens.valor_unidade, produtos.nome FROM itens 
                 INNER JOIN produtos on itens.produto_id=produtos.id
                 WHERE venda_id = {venda_id} """.format(venda_id=venda_id)
     
        con = db.engine.connect()
        itens = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return itens