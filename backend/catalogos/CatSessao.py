from modelos.Sessao.Sessao import Sessao
import random
from catalogos.CatFilme import CatFilme
from catalogos.CatSala import CatSala
from catalogos.CatTipoAudio import CatTipoAudio
from catalogos.CatTipoExibicao import CatTipoExibicao
class CatSessao:
    _sessoes = []
    @classmethod
    def mock_data(cls):
        filmes = CatFilme.get_all() 
        
        dub = CatTipoAudio.get_by_nome("Dublado")
        leg = CatTipoAudio.get_by_nome("Legendado")
        ex2d = CatTipoExibicao.get_by_nome("2D")
        ex3d = CatTipoExibicao.get_by_nome("3D")

        cls._sessoes = []
        
        id_counter = 1
        for filme in filmes:
            # Gera entre 3 e 5 sessões por filme
            num_sessoes = random.randint(3, 5)
            
            for _ in range(num_sessoes):

                hora = random.randint(12, 22)
                minuto = random.choice(["00", "15", "30", "45"])
                horario = f"{hora}:{minuto}"
                

                id_sala = random.randint(1, 5)
                sala = CatSala.get_sala(id_sala)
                

                tipo = random.choice([ex2d, ex3d])
                audio = random.choice([dub, leg])
                
                sessao = Sessao(
                    id_counter, 
                    filme, 
                    sala, 
                    horario, 
                    tipo, 
                    audio
                )


                rows = ['N','M','L','K','J','I','H','G','F','E','D','C','B','A']
                cols = range(1, 15) # 1 a 14
                

                num_ocupados = random.randint(5, 40)
                
                ocupados = set()
                while len(ocupados) < num_ocupados:
                    r = random.choice(rows)
                    c = random.choice(cols)
                    seat_id = f"{r}{c}"
                    ocupados.add(seat_id)
                
                sessao.disponibilidade.assentos_ocupados = list(ocupados)
                # ----------------------------------------------

                cls._sessoes.append(sessao)
                id_counter += 1

    @classmethod
    def get_sessao(cls, id_sessao): return next((s for s in cls._sessoes if s.id == id_sessao), None)

    @classmethod
    def get_by_filme(cls, id_filme):
        sessoes = [s for s in cls._sessoes if s.filme.id == id_filme]
        return sorted(sessoes, key=lambda s: s.horario)