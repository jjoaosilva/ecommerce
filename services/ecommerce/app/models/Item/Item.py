from app import db

class Item(db.Model):
    __tablename__ = "itens"

    id = db.Column(db.Integer, primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)
    valor_unidade = db.Column(db.Float, nullable=False)
    produto_id = db.Column(db.ForeignKey(  'produtos.id', 
                                            ondelete ='CASCADE', 
                                            onupdate ='RESTRICT'), 
                                            nullable =False )
    venda_id = db.Column(db.ForeignKey(  'vendas.id', 
                                            ondelete ='CASCADE', 
                                            onupdate ='RESTRICT'), 
                                            nullable =False )
    
    def __init__(self, quantidade, valor_unidade, produto_id, venda_id):
        self.quantidade = quantidade
        self.valor_unidade = valor_unidade
        self.produto_id = produto_id
        self.venda_id = venda_id
    
    def __repr__(self):
        return '<Item %r>' % self.valor_unidade