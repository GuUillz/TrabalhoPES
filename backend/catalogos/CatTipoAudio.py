from modelos.Sessao.TipoAudio import TipoAudio
class CatTipoAudio:
    _dados = [TipoAudio(1, "Dublado"), TipoAudio(2, "Legendado")]
    @classmethod
    def get_by_nome(cls, nome): return next((x for x in cls._dados if x.nome == nome), None)