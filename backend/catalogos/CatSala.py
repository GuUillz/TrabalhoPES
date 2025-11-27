from modelos.Sala.Sala import Sala
from catalogos.CatTipoSala import CatTipoSala
class CatSala:
    _salas = []
    @classmethod
    def mock_data(cls):
        tipo_comum = CatTipoSala.get_by_id(1)
        cls._salas = [
            Sala(1, "Sala 01", 100, tipo_comum),
            Sala(2, "Sala 02", 80, tipo_comum),
            Sala(3, "Sala 03", 60, tipo_comum),
            Sala(4, "Sala 04", 50, tipo_comum),
            Sala(5, "Sala 05", 120, tipo_comum)
        ]
    @classmethod
    def get_sala(cls, id): return next((s for s in cls._salas if s.id == id), None)