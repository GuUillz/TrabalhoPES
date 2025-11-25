from datetime import datetime
from modelos.TipoPagamento import TipoPagamento
from Sessao.Sessao import Sessao
class Compra:
    def __init__(self, id, total:float, obj_tipoPagamento:TipoPagamento, obj_sessao:Sessao):
        self.id = id
        self.total = total
        self.tipo_pagamento = obj_tipoPagamento
        self.sessao = obj_sessao
        self.data = datetime.now()
        self.ingressos = []

    def adicionar_ingresso(self, ingresso):
        self.ingressos.append(ingresso)