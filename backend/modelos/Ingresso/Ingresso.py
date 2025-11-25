from modelos.Compra import Compra
import TipoIngresso
import backend.modelos.Assento.Assento as Assento
class Ingresso:
    def __init__(self, id, obj_compra:Compra, obj_tipo_ingresso:TipoIngresso, assento:Assento, valor:float):
        self.id = id
        self.compra = obj_compra
        self.tipo_ingresso = obj_tipo_ingresso
        self.assento = assento
        self.valor = valor