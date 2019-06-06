from app import db

class Venda(db.Model):
    __tablename__ = "vendas"

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.DateTime, nullable=False)
    valor = db.Column(db.Float, nullable=False)
    cliente_login = db.Column(db.ForeignKey(  'clientes.login', 
                                            ondelete ='CASCADE', 
                                            onupdate ='RESTRICT'), 
                                            nullable =False )
    
    def __init__(self, data, valor, cliente_login):
        self.data = data
        self.valor = valor
        self.cliente_login = cliente_login
    
    def __repr__(self):
        return '<Venda %r>' % self.valor