from modelos.Filme.Genero import Genero
class CatGenero:
    _dados = [
        Genero(1, "Ação"), Genero(2, "Terror"), Genero(3, "Aventura"),
        Genero(4, "Infantil"), Genero(5, "Suspense")
    ]
    @classmethod
    def get_by_id(cls, id): return next((x for x in cls._dados if x.id == id), None)