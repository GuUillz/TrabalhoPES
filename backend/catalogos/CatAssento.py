from modelos.Assento.Assento import Assento
from catalogos.CatTipoAssento import CatTipoAssento
class CatAssento:
    _assentos = []
    @classmethod
    def mock_data(cls):
        tipo = CatTipoAssento.get_padrao()
        rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
        for row in rows:
            for col in range(1, 15):
                # ID composto F5
                cls._assentos.append(Assento(f"{row}{col}", row, str(col), tipo))
    @classmethod
    def get_assento(cls, id): return next((a for a in cls._assentos if a.id == id), None)