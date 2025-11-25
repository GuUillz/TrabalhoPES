class TipoIngresso:
    def __init__(self,id,nome:str,valor:float):
        self.id = id
        self.nome = nome
        self.valor = valor
    def setValor(self, novoValor):
        self.valor = float(novoValor)