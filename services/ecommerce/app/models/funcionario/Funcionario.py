from app import db

class Funcionario(db.Model):
    __tablename__ = "funcionarios"

    login = db.Column(db.String(120), primary_key=True, unique=True)
    nome  = db.Column(db.String(120), nullable=False)
    senha = db.Column(db.String(120), nullable=False)
    salario = db.Column(db.Float, nullable=False)
    
    def __init__(self, login, nome, senha, salario):
        self.login = login
        self.nome = nome
        self.senha = senha
        self.salario = salario
    
    def __repr__(self):
        return '<Funcionario %r>' % self.nome