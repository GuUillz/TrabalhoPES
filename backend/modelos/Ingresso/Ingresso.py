from modelos.Compra import Compra
from modelos.Ingresso.TipoIngresso import TipoIngresso
from modelos.Assento.Assento import Assento

class Ingresso:
    def __init__(self, id, obj_compra:Compra, obj_tipo_ingresso:TipoIngresso, assento:Assento, valor:float):
        self.id = id
        self.compra = obj_compra
        self.tipo_ingresso = obj_tipo_ingresso
        self.assento = assento
        self.valor = valor