from modelos.Filme.ClassificacaoIndicativa import ClassificacaoIndicativa
class CatClassificacao:
    _dados = [
        ClassificacaoIndicativa(1, 0, "Livre"),
        ClassificacaoIndicativa(2, 12, "12 anos"),
        ClassificacaoIndicativa(3, 14, "14 anos"),
        ClassificacaoIndicativa(4, 16, "16 anos"),
        ClassificacaoIndicativa(5, 18, "18 anos"),
    ]
    @classmethod
    def get_by_idade(cls, idade): return next((x for x in cls._dados if x.idade == idade), None)