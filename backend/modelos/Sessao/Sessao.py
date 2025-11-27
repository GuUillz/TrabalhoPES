from modelos.DisponibilidadeAssento import DisponibilidadeAssento
from modelos.Sessao.TipoAudio import TipoAudio
from modelos.Sessao.TipoExibicao import TipoExibicao
from modelos.Filme.Filme import Filme
from modelos.Sala.Sala import Sala

class Sessao:
    def __init__(self, id, obj_filme: Filme, obj_sala:Sala, horario, obj_tipoExibicao:TipoExibicao, obj_tipoAudio:TipoAudio):
        self.id = id
        self.filme = obj_filme
        self.sala = obj_sala
        self.horario = horario
        self.tipoExibicao = obj_tipoExibicao
        self.tipoAudio = obj_tipoAudio
        self.disponibilidade = DisponibilidadeAssento(self)