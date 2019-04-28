from app import db

class Cliente(db.Model):
    __tablename__ = "clientes"

    login = db.Column(db.String(120), primary_key=True, unique=True)
    nome  = db.Column(db.String(120), nullable=False)
    senha = db.Column(db.String(120), nullable=False)
    
    def __init__(self, login, nome, senha):
        self.login = login
        self.nome  = nome
        self.senha = senha
    
    def __repr__(self):
        return '<Cliente %r>' % self.login