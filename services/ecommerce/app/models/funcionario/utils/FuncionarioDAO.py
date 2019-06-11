from app import db
from app.models.funcionario.Funcionario import * 

import sqlalchemy

class FuncionarioDAO:
    
    def __init__(self):
        pass

    def login(self, login, senha):
        funcionario = Funcionario.query.filter_by(login = login).first()
        print(funcionario)
        return funcionario

    def create(self, login, nome, senha, salario):

        funcionario = Funcionario(login, nome, senha, salario)
        db.session.add(funcionario)
        db.session.commit()

        return {"login": funcionario.login, "nome": funcionario.nome, "salario": funcionario.salario}
   
    def read(self, nome):

        sql = 'SELECT login, nome, salario FROM funcionarios '

        if nome != "" and nome != None:
            sql = sql + "WHERE nome ilike '%{nome}%'".format(nome = nome)
     
        con = db.engine.connect()
        funcionarios = con.execute(sqlalchemy.text(sql)).fetchall()
   
        return funcionarios

    def update(self, login, newLogin, nome, senha, salario):

        funcionario = Funcionario.query.get(login)
        f = db.session.delete(funcionario)
        db.session.flush()

        newFuncionario = Funcionario(newLogin, nome, senha, salario)
        db.session.add(newFuncionario)
        db.session.commit()

        return {"login": newFuncionario.login, "nome": newFuncionario.nome, "salario": newFuncionario.salario}
    

    def delete(self, login):

        funcionario = Funcionario.query.get(login)
        f = db.session.delete(funcionario)
        db.session.commit()

        return f

    def getFuncionarioById(self, login):

        sql = """ SELECT login, nome, salario FROM funcionarios WHERE login ilike \'{login}\'
              """.format(login=login)

        con = db.engine.connect()
        funcionario = con.execute(sqlalchemy.text(sql)).fetchone()
        return funcionario
    
