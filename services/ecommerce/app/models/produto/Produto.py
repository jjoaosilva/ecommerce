from app import db

class Produto(db.Model):
    __tablename__ = "produtos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False, unique=True)
    descricao = db.Column(db.Text, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    url = db.Column(db.String(255), nullable=False, unique=True)
    categoria_id = db.Column(db.ForeignKey( 'categorias.id', 
                                             ondelete ='CASCADE', 
                                             onupdate ='RESTRICT'), 
                                             nullable =False )
    
    def __init__(self, nome, descricao, preco, categoria_id, url):
        self.nome = nome
        self.descricao = descricao
        self.preco = preco
        self.categoria_id = categoria_id
        self.url = url
    
    def __repr__(self):
        return '<Produto %r>' % self.nome