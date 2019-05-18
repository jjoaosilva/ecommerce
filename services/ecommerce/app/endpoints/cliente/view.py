from app import *
from app.models.cliente.utils.ClienteDAO import *

from flask import jsonify, request

@app.endpoint('/criar-cliente')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = cDAO.create(content['login'], content['nome'], content['senha'])

        return jsonify({
            "status": True,
            "mensagem": "Cliente inserido com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na criacao do Cliente!!!",
            "payload": error.args  
        })

@app.endpoint('/procurar-clientes')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = cDAO.read(content['nome'])

        clientes = []
        for cliente in response:
            clientes.append({
                'login': cliente['login'],
                'nome': cliente['nome']
            })

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": clientes
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura do Cliente!!!",
            "payload": error.args  
        })

@app.endpoint('/deletar-cliente')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = cDAO.delete(content['login'])

        return jsonify({
            "status": True,
            "mensagem": "Cliente deletado com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na delecao do Cliente!!!",
            "payload": error.args  
        })

@app.endpoint('/editar-cliente')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = cDAO.update(content['login'], content['novoLogin'], content['nome'], content['senha'])

        return jsonify({
            "status": True,
            "mensagem": "Cliente editado com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na edicao do Cliente!!!",
            "payload": error.args  
        })

@app.endpoint('/login-cliente')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = ClienteDAO()

        response = cDAO.login(content['login'], content['senha'])
        if response == None or response.senha != content['senha']:
            return jsonify({
                "status": False,
                "mensagem": "Login ou senha incorretos.",
                "payload": None
            })

        return jsonify({
            "status": True,
            "mensagem": "Cliente foi encontrado.",
            "payload": {
                        'login': response.login,
                        'nome': response.nome
                        }
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema no login do Cliente!!",
            "payload": error.args  
        })