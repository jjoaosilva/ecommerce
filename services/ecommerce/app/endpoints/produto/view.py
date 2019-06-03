from app import *
from app.models.produto.utils.ProdutoDAO import *
from app.models.categoria.utils.CategoriaDAO import *

from flask import jsonify, request

@app.endpoint('/criar-produto')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        response = pDAO.create(content['nome'], content['descricao'], content['preco'], content['categoria_id'], content['url'])

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
                "url"          : produto.url,
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

@app.endpoint('/produto-por-categoria')
def index():
    try:
        pDAO = ProdutoDAO()
        cDAO = CategoriaDAO()

        response = cDAO.read('')
        categorias = []
        for categoria in response:
            categorias.append({
                'nome': categoria['nome']
            })

        response = pDAO.read('')

        produtos = []
        for produto in response:
            produtos.append({
                "id"           : produto.id,
                "nome"         : produto.nome, 
                "descricao"    : produto.descricao, 
                "preco"        : produto.preco, 
                "categoria" : produto.categoria
            })
        
        retorno = {}
        for categoria in categorias:
            qtd = 0
            for produto in produtos:
                if not categoria['nome'] in retorno:
                    retorno[categoria['nome']] = []

                if categoria['nome'] == produto['categoria'] and qtd < 3:
                    retorno[categoria['nome']].append(produto)
                    qtd = qtd + 1

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": retorno
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura de Produtos!!!",
            "payload": error.args  
        })

@app.endpoint('/get-produto-id')
def index():
    try:
        content = request.get_json(silent = True)
        pDAO = ProdutoDAO()

        produto = pDAO.getProductById(content['id'])

        response = {
            "id"           : produto.id,
            "nome"         : produto.nome, 
            "descricao"    : produto.descricao, 
            "preco"        : produto.preco, 
            "url"          : produto.url,
            "categoria" : produto.categoria
        }

        return jsonify({
            "status": True,
            "mensagem": None,
            "payload": response
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Problema na procura de Produtos!!!",
            "payload": error.args  
        })