from app import *
from app.models.item.utils.ItemDAO import *
from app.models.venda.utils.VendaDAO import *

from flask import jsonify, request
import datetime


@app.endpoint('/compra')
def index():
    try:
        content = request.get_json(silent = True)
        iDAO = ItemDAO()
        vDAO = VendaDAO()

        venda = vDAO.create(datetime.datetime.now(), content['valor'], content['cliente_id'])
        for item in content['itens']:
            iDAO.create(item['quantidade'], item['valor_unidade'], item['produto_id'], venda.id)

        return jsonify({
            "status": True,
            "mensagem": "Venda realizada!!!",
            "payload": venda.id
        
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Erro na venda!!!",
            "payload": error.args  
        })

@app.endpoint('/procurar-vendas')
def index():
    try:
        content = request.get_json(silent = True)
        iDAO = ItemDAO()
        vDAO = VendaDAO()

        retorno = []
        vendas = vDAO.read(content['cliente_id'])
        for venda in vendas:
            itens_venda = []    
            itens = iDAO.read(venda.id)
            for item in itens:
                itens_venda.append({
                    "quantidade": item.quantidade, 
                    "valor_unidade": item.valor_unidade, 
                    "produto_id": item.nome,
                })

            retorno.append({
                "venda_id":venda.id,
                "valor": venda.valor,
                "data": venda.data.strftime("%x"),
                "itens": itens_venda
            })

        return jsonify({
            "status": True,
            "mensagem": "Procura finalizada!!!",
            "payload": retorno
        
        })

    except Exception as error:
        return jsonify({
            "status": False,
            "mensagem": "Erro procura!!!",
            "payload": error.args  
        })