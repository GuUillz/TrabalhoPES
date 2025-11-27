from modelos.Assento.TipoAssento import TipoAssento
class Assento:
    def __init__(self,id,fileira:str,numero:str,obj_tipoAssento:TipoAssento):
        self.id = id
        self.fileira = fileira
        self.numero = numero
        self.tipoAssento = obj_tipoAssento