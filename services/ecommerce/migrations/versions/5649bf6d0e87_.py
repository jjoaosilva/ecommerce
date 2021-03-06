"""empty message

Revision ID: 5649bf6d0e87
Revises: 
Create Date: 2019-04-19 19:02:11.862406

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5649bf6d0e87'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('clientes',
    sa.Column('login', sa.String(length=120), nullable=False),
    sa.Column('nome', sa.String(length=120), nullable=False),
    sa.Column('senha', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('login'),
    sa.UniqueConstraint('login')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('clientes')
    # ### end Alembic commands ###
