from modelos.Filme.Filme import Filme
from catalogos.CatGenero import CatGenero
from catalogos.CatClassificacao import CatClassificacao
class CatFilme:
    _filmes = []
    
    @classmethod
    def mock_data(cls):
        acao = CatGenero.get_by_id(1)
        terror = CatGenero.get_by_id(2)
        aventura = CatGenero.get_by_id(3)
        infantil = CatGenero.get_by_id(4)
        suspense = CatGenero.get_by_id(5)

        cl_18 = CatClassificacao.get_by_idade(18)
        cl_14 = CatClassificacao.get_by_idade(14)
        cl_16 = CatClassificacao.get_by_idade(16)
        cl_livre = CatClassificacao.get_by_idade(0)
        cl_12 = CatClassificacao.get_by_idade(12)


        cls._filmes = [
            Filme(1, "O Agente Secreto", 120, "Sinopse...", acao, cl_14, None),
            Filme(2, "O Telefone Preto 2", 114, "Sinopse...", terror, cl_18, None),
            Filme(3, "Terras Selvagens", 130, "Sinopse...", aventura, cl_16, None),
            Filme(4, "Patrulha Canina", 90, "Sinopse...", infantil, cl_livre, None),
            Filme(5, "Truque de Mestre 3", 110, "Sinopse...", suspense, cl_12, None),
        ]
        
        for f in cls._filmes:
            f.poster = f"https://placehold.co/300x450/blue/white?text={f.titulo.replace(' ', '+')}"
    
    @classmethod
    def get_all(cls): return cls._filmes
    @classmethod
    def get_by_id(cls, id): return next((x for x in cls._filmes if x.id == id), None)