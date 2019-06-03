from app import *
from app.models.categoria.utils.CategoriaDAO import *

from flask import jsonify, request

@app.endpoint('/criar-categoria')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = CategoriaDAO()

        response = cDAO.create(content['nome'], content['descricao'])

        return jsonify({
            "status": True,
            "mensagem": "Categoria inserido com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na criacao da Categoria!!!",
            "payload": error.args  
        })

@app.endpoint('/procurar-categorias')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = CategoriaDAO()

        response = cDAO.read(content['nome'])

        categorias = []
        for categoria in response:
            categorias.append({
                'id': categoria['id'],
                'nome': categoria['nome'],
                'descricao': categoria['descricao']
            })

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": categorias
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura da Categoria!!!",
            "payload": error.args  
        })

@app.endpoint('/deletar-categoria')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = CategoriaDAO()

        response = cDAO.delete(content['id'])

        return jsonify({
            "status": True,
            "mensagem": "Categoria deletada com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na delecao da Categoria!!!",
            "payload": error.args  
        })

@app.endpoint('/editar-categoria')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = CategoriaDAO()

        response = cDAO.update(content['id'], content['nome'], content['descricao'])

        return jsonify({
            "status": True,
            "mensagem": "Categoria editada com sucesso!!!",
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na edicao da Categoria!!!",
            "payload": error.args  
        })
        
@app.endpoint('/get-categoria-id')
def index():
    try:
        content = request.get_json(silent = True)
        cDAO = CategoriaDAO()

        categoria = cDAO.getCategoriaById(content['id'])

        response = {
            "id"           : categoria.id,
            "nome"         : categoria.nome, 
            "descricao"    : categoria.descricao
        }

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura de Categoria!!!",
            "payload": error.args  
        })