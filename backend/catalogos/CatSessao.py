from modelos.Sessao.Sessao import Sessao
from catalogos.CatFilme import CatFilme
from catalogos.CatSala import CatSala
from catalogos.CatTipoAudio import CatTipoAudio
from catalogos.CatTipoExibicao import CatTipoExibicao
class CatSessao:
    _sessoes = []
    @classmethod
    def mock_data(cls):
        filmes = CatFilme.get_all() # Lista de filmes
        sala4 = CatSala.get_sala(4)
        sala1 = CatSala.get_sala(1)
        
        dub = CatTipoAudio.get_by_nome("Dublado")
        leg = CatTipoAudio.get_by_nome("Legendado")
        ex2d = CatTipoExibicao.get_by_nome("2D")
        ex3d = CatTipoExibicao.get_by_nome("3D")

        # Filmes[3] é Patrulha Canina
        cls._sessoes = [
            Sessao(1, filmes[3], sala4, "14:15", ex2d, dub), 
            Sessao(2, filmes[3], sala4, "16:00", ex3d, dub),
            Sessao(3, filmes[3], sala1, "19:00", ex2d, leg),
            Sessao(4, filmes[3], sala4, "20:30", ex2d, dub),
            Sessao(5, filmes[3], sala1, "21:45", ex2d, leg),
        ]
    @classmethod
    def get_sessao(cls, id_sessao): return next((s for s in cls._sessoes if s.id == id_sessao), None)