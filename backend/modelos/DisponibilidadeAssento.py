from Sessao.Sessao import Sessao
import Assento
class DisponibilidadeAssento:
    def __init__(self, sessao:Sessao):
        self.sessao = sessao
        self.assentos_ocupados = [] 

    def verificar_disponibilidade(self, obj_assento:Assento):
        return obj_assento.id not in self.assentos_ocupados

    def ocupar_assento(self, obj_assento:Assento):
        self.assentos_ocupados.append(obj_assento.id)