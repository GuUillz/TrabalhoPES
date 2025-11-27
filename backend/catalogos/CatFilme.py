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
            Filme(1, "O Agente Secreto", 120, "Em 1977, Marcelo trabalha como professor especializado em tecnologia. Ele decide fugir de seu passado violento e misterioso se mudando de São Paulo para Recife com a intenção de recomeçar sua vida. Marcelo chega na capital pernambucana em plena semana do Carnaval e percebe que atraiu para si todo o caos do qual ele sempre quis fugir. Para piorar a situação, ele começa a ser espionado pelos vizinhos. Inesperadamente, a cidade que ele acreditou que o acolheria ficou longe de ser o seu refúgio.", acao, cl_14, None),
            Filme(2, "O Telefone Preto 2", 114, "Pesadelos assombram Gwen, de 15 anos, enquanto ela recebe chamadas do telefone preto e tem visões perturbadoras de três rapazes sendo perseguidos em um acampamento de inverno. Com a ajuda de seu irmão, ela deve agora confrontar um assassino que se tornou ainda mais poderoso na morte.", terror, cl_18, None),
            Filme(3, "Terras Selvagens", 130, "Expulso do seu clã, um caçador alienígena e um aliado improvável embarcam em uma jornada traiçoeira em busca do adversário supremo.", aventura, cl_16, None),
            Filme(4, "Patrulha Canina", 90, "O filhote Ryder e seus amigos têm um grande desafio: impedir o novo prefeito da cidade, Humdinger, de causar muitos problemas. Juntos e equipados com muita tecnologia, a Patrulha Canina luta para salvar os moradores da Cidade da Aventura.", infantil, cl_livre, None),
            Filme(5, "Truque de Mestre 3", 110, "Em Truque de Mestre: O 3º Ato, os ilusionistas conhecidos como os Quatro Cavaleiros retornam para um novo golpe que envolve roubar o diamante mais valioso do mundo. Eles se unem a uma nova geração de mágicos digitais e enfrentam uma perigosa organização criminosa global para completar a missão, que os leva a uma perseguição global repleta de reviravoltas", suspense, cl_12, None)
        ]

      
        posters = {
            1: "/static/posters/O_Agente_Secreto.jpg",
            2: "/static/posters/O_Telefone_Preto2.jpeg",
            3: "/static/posters/Terra_Selvagem.jpeg",
            4: "/static/posters/Patrulha_Canina.jpg",
            5: "/static/posters/Truque_de_Mestre3.jpg"
        }
        
        for f in cls._filmes:
            f.poster = posters.get(f.id, f"https://placehold.co/300x450/blue/white?text={f.titulo.replace(' ', '+')}")
    
    @classmethod
    def get_all(cls): return cls._filmes
    @classmethod
    def get_by_id(cls, id): return next((x for x in cls._filmes if x.id == id), None)