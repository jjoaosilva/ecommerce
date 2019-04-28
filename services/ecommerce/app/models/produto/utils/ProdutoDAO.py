from app import db
from app.models.produto.Produto import * 

import sqlalchemy

class ProdutoDAO:
    
    def __init__(self):
        pass

    def create(self, nome, descricao, preco, categoria_id):

        produto = Produto(nome, descricao, preco, categoria_id)
        db.session.add(produto)
        db.session.commit()

        return {"nome"         : produto.nome, 
                "descricao"    : produto.descricao, 
                "preco"        : produto.preco, 
                "categoria_id" : produto.categoria_id }
   
    def read(self, nome):

        sql = """ SELECT p.id, p.nome, p.descricao, p.preco, c.nome as categoria FROM produtos as p
                  INNER JOIN categorias as c ON c.id = p.categoria_id
              """

        if nome != "" and nome != None:
            sql = sql + "WHERE p.nome ilike '%{nome}%'".format(nome = nome)
     
        con = db.engine.connect()
        produtos = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return produtos

    def update(self, id, nome, descricao, preco, categoria_id):

        produto = Produto.query.get(id)
        p = db.session.delete(produto)
        db.session.flush()

        newProduto = Produto(nome, descricao, preco, categoria_id)
        db.session.add(newProduto)
        db.session.commit()

        return {"nome"         : newProduto.nome, 
                "descricao"    : newProduto.descricao, 
                "preco"        : newProduto.preco, 
                "categoria_id" : newProduto.categoria_id }
    

    def delete(self, id):

        produto = Produto.query.get(id)
        p = db.session.delete(produto)
        db.session.commit()

        return p
    
