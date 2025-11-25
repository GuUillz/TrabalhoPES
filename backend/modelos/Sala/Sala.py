import TipoSala
class Sala:
    def __init__(self,id, nome:str, capacidade:int,obj_tipoSala:TipoSala):
        self.id = id
        self.nome = nome
        self.capacidade = capacidade
        self.tipoSala = obj_tipoSala