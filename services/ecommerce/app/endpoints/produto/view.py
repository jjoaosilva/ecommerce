from app import *
from app.models.produto.utils.ProdutoDAO import *

from flask import jsonify, request

@app.endpoint('/criar-produto')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        response = pDAO.create(content['nome'], content['descricao'], content['preco'], content['categoria_id'])

        return jsonify({
            "status": True,
            "mensagem": "Produto inserido com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na criacao do Produto!!!",
            "payload": error.args  
        })

@app.endpoint('/procurar-produtos')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        response = pDAO.read(content['nome'])

        produtos = []
        for produto in response:
            produtos.append({
                "id"           : produto.id,
                "nome"         : produto.nome, 
                "descricao"    : produto.descricao, 
                "preco"        : produto.preco, 
                "categoria" : produto.categoria
            })

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": produtos
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura de Produtos!!!",
            "payload": error.args  
        })

@app.endpoint('/deletar-produto')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        response = pDAO.delete(content['id'])

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

@app.endpoint('/editar-produto')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        response = pDAO.update( content['id'], 
                                content['nome'], 
                                content['descricao'], 
                                content['preco'], 
                                content['categoria_id'] )

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
        