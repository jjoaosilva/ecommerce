from app import *
from app.models.funcionario.utils.FuncionarioDAO import *

from flask import jsonify, request

@app.endpoint('/criar-funcionario')
def index():
    try:
        content = request.get_json(silent = True)
        fDAO = FuncionarioDAO()

        response = fDAO.create(content['login'], content['nome'], content['senha'], content['salario'])

        return jsonify({
            "status": True,
            "mensagem": "Funcionario inserido com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na criacao do Funcionario!!!",
            "payload": error.args  
        })

@app.endpoint('/procurar-funcionarios')
def index():
    try:
        content = request.get_json(silent = True)
        fDAO = FuncionarioDAO()

        response = fDAO.read(content['nome'])

        funcionarios = []
        for funcionario in response:
            funcionarios.append({
                'login': funcionario['login'],
                'nome': funcionario['nome'],
                'salario': funcionario['salario']
            })

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": funcionarios
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura do Produto!!!",
            "payload": error.args  
        })

@app.endpoint('/deletar-funcionario')
def index():
    try:
        content = request.get_json(silent = True)
        fDAO = FuncionarioDAO()

        response = fDAO.delete(content['login'])

        return jsonify({
            "status": True,
            "mensagem": "Produto deletado com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na delecao do Produto!!!",
            "payload": error.args  
        })

@app.endpoint('/editar-funcionario')
def index():
    try:
        content = request.get_json(silent = True)
        fDAO = FuncionarioDAO()

        response = fDAO.update(content['login'], content['novoLogin'], content['nome'], content['senha'], content['salario'])

        return jsonify({
            "status": True,
            "mensagem": "Produto editado com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na edicao do Produto!!!",
            "payload": error.args  
        })

@app.endpoint('/login-funcionario')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = fDAO.login(content['login'], content['senha'])
        if response == None:
            return jsonify({
                "status": False,
                "mensagem": "Login ou senha incorretos.",
                "payload": None
            })

        return jsonify({
            "status": True,
            "mensagem": "Funcionario foi encontrado.",
            "payload": {
                        'login': response.login,
                        'nome': response.nome
                        }
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema no login do Funcionario!!",
            "payload": error.args  
        })