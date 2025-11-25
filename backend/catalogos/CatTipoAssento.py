from modelos.Assento.TipoAssento import TipoAssento
class CatTipoAssento:
    _dados = [TipoAssento("Padrão"), TipoAssento("Preferencial")]
    @classmethod
    def get_padrao(cls): return cls._dados[0]
    @classmethod
    def get_preferencial(cls): return cls._dados[1]