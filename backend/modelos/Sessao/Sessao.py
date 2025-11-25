from modelos.DisponibilidadeAssento import DisponibilidadeAssento
import TipoAudio
import TipoExibicao
from modelos.Filme import Filme
from modelos.Sala import Sala
class Sessao:
    def __init__(self,id,obj_filme: Filme ,obj_sala:Sala,horario,obj_tipoExibicao:TipoExibicao,obj_tipoAudio:TipoAudio):
        self.id = id
        self.filme = obj_filme
        self.sala = obj_sala
        self.horario = horario
        self.tipoExibicao = obj_tipoExibicao
        self.tipoAudio = obj_tipoAudio
        self.disponibilidade = DisponibilidadeAssento(self)