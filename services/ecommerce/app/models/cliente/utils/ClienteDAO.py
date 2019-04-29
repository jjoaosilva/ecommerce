from app import db
from app.models.cliente.Cliente import * 

import sqlalchemy

class ClienteDAO:
    
    def __init__(self):
        pass

    def login(self, login, senha):
        cliente = Cliente.query.filter_by(login = login).first()
        
        return cliente

    def create(self, login, nome, senha):

        cliente = Cliente(login, nome, senha)
        db.session.add(cliente)
        db.session.commit()

        return {"login": cliente.login, "nome": cliente.nome}
   
    def read(self, nome):

        sql = 'SELECT login, nome FROM clientes '

        if nome != "" and nome != None:
            sql = sql + "WHERE nome ilike '%{nome}%'".format(nome = nome)
     
        con = db.engine.connect()
        clientes = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return clientes

    def update(self, login, newLogin, nome, senha):

        cliente = Cliente.query.get(login)
        c = db.session.delete(cliente)
        db.session.flush()

        newCliente = Cliente(newLogin, nome, senha)
        db.session.add(newCliente)
        db.session.commit()

        return {"login": newCliente.login, "nome": newCliente.nome}
    

    def delete(self, login):

        cliente = Cliente.query.get(login)
        c = db.session.delete(cliente)
        db.session.commit()

        return c
    
