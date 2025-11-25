from modelos.Sala.TipoSala import TipoSala
class CatTipoSala:
    _dados = [TipoSala(1, "Comum"), TipoSala(2, "IMAX"), TipoSala(3, "VIP")]
    @classmethod
    def get_by_id(cls, id): return next((x for x in cls._dados if x.id == id), None)