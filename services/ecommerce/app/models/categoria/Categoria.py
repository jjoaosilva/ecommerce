from app import db

class Categoria(db.Model):
    __tablename__ = "categorias"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False, unique=True)
    descricao = db.Column(db.Text, nullable=False)
    
    def __init__(self, nome, descricao):
        self.nome = nome
        self.descricao = descricao
    
    def __repr__(self):
        return '<Categoria %r>' % self.nome