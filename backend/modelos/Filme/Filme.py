from modelos.Filme.Genero import Genero
from modelos.Filme.ClassificacaoIndicativa import ClassificacaoIndicativa
class Filme:
    def __init__(self, id, titulo:str, duracao, sinopse:str, obj_genero:Genero, obj_classficacaoIndicativa:ClassificacaoIndicativa, obj_sessao):
        self.id = id
        self.titulo = titulo
        self.duracao = duracao
        self.sinopse = sinopse
        self.classificacao = obj_classficacaoIndicativa
        self.genero = obj_genero
        self.sessao = obj_sessao
        self.poster = None