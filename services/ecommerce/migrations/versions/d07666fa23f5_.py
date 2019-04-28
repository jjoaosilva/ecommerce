"""empty message

Revision ID: d07666fa23f5
Revises: 1d660c8f7c59
Create Date: 2019-04-20 00:34:35.824725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd07666fa23f5'
down_revision = '1d660c8f7c59'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, ' categorias', ['nome'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, ' categorias', type_='unique')
    # ### end Alembic commands ###
