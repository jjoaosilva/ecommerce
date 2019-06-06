from app import db

class Item(db.Model):
    __tablename__ = "itens"

    quantidade = db.Column(db.Integer, nullable =False)
    valor_unidade = db.Column(db.Float, nullable=False)
    venda_id = db.Column(db.ForeignKey(  'vendas.id', 
                                            ondelete ='CASCADE', 
                                            onupdate ='RESTRICT'), 
                                            nullable =False )
    produto_id = db.Column(db.ForeignKey(  'prdutos.id', 
                                            ondelete ='CASCADE', 
                                            onupdate ='RESTRICT'), 
                                            nullable =False )
    
    def __init__(self, quantidade, valor_unidade, venda_id, produto_id):
        self.quantidade = quantidade
        self.valor_unidade = valor_unidade
        self.venda_id = venda_id
        self.produto_id = produto_id
    
    def __repr__(self):
        return '<Item %r>' % self.valor