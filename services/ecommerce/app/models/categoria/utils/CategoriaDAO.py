from app import db
from app.models.categoria.Categoria import * 

import sqlalchemy

class CategoriaDAO:
    
    def __init__(self):
        pass

    def create(self, nome, decricao):

        categoria = Categoria(nome, decricao)
        db.session.add(categoria)
        db.session.commit()

        return {"nome":categoria.nome, "descricao": categoria.descricao}
   
    def read(self, nome):

        sql = 'SELECT id, nome, descricao FROM categorias '

        if nome != "" and nome != None:
            sql = sql + "WHERE nome ilike '%{nome}%'".format(nome = nome)
     
        con = db.engine.connect()
        categorias = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return categorias

    def update(self, id, nome, descricao):

        categoria = Categoria.query.get(id)
        c = db.session.delete(categoria)
        db.session.flush()

        newCategoria = Categoria(nome, descricao)
        db.session.add(newCategoria)
        db.session.commit()

        return {"nome": newCategoria.nome, "descricao": newCategoria.descricao}

    def delete(self, id):

        categoria = Categoria.query.get(id)
        c = db.session.delete(categoria)
        db.session.commit()

        return c

    def getCategoriaById(self, id):

        sql = """ SELECT id, nome, descricao FROM categorias WHERE id={id}
              """.format(id=id)

        con = db.engine.connect()
        categoria = con.execute(sqlalchemy.text(sql)).fetchone()
        return categoria
    
