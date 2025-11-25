from modelos.Sessao.TipoExibicao import TipoExibicao
class CatTipoExibicao:
    _dados = [TipoExibicao(1, "2D"), TipoExibicao(2, "3D")]
    @classmethod
    def get_by_nome(cls, nome): return next((x for x in cls._dados if x.nome == nome), None)