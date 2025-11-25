import uuid
from modelos.Compra import Compra
from modelos.Ingresso.Ingresso import Ingresso
from modelos.TipoPagamento import TipoPagamento
from catalogos.CatSessao import CatSessao
from catalogos.CatTipoIngresso import CatTipoIngresso
from catalogos.CatAssento import CatAssento
from controladoras.ctrlSistemaPagamento import SistemaPagamento

class CtrCompra:
    def __init__(self):
        self.sistema_pagamento = SistemaPagamento()

    def realizar_compra(self, id_sessao, ids_assentos, mapa_tipos, nome_tipo_pagamento):
   
        obj_sessao = CatSessao.get_sessao(id_sessao)
        if not obj_sessao: return False, "Sessão não encontrada"

        ingressos_temp = []
        total_valor = 0.0

   
        for id_assento in ids_assentos:
            obj_assento = CatAssento.get_assento(id_assento)
            

            disponivel = obj_sessao.disponibilidade.verificar_disponibilidade(obj_assento)
            if not disponivel:
                return False, f"O assento {obj_assento.id} já está ocupado."
            
    
            tipo_id = mapa_tipos.get(id_assento)
            obj_tipo_ingresso = CatTipoIngresso.get_tipo_ingresso(tipo_id)
            if not obj_tipo_ingresso: return False, "Tipo de ingresso inválido"

            valor_item = obj_tipo_ingresso.valor
            total_valor += valor_item
            
            ingressos_temp.append({
                "assento": obj_assento,
                "tipo": obj_tipo_ingresso,
                "valor": valor_item
            })

  
        aprovado = self.sistema_pagamento.processar_pagamento(total_valor, nome_tipo_pagamento)

        if aprovado:
            # Cria objeto TipoPagamento na hora (ou buscaria de um catálogo)
            obj_pagamento = TipoPagamento(1, nome_tipo_pagamento)
            
            # Cria a Compra
            nova_compra = Compra(str(uuid.uuid4()), total_valor, obj_pagamento, obj_sessao)
            
            for item in ingressos_temp:
         
                obj_sessao.disponibilidade.ocupar_assento(item["assento"])
                
                
                novo_ingresso = Ingresso(
                    str(uuid.uuid4()), 
                    nova_compra, 
                    item["tipo"], 
                    item["assento"], 
                    item["valor"]
                )
                nova_compra.adicionar_ingresso(novo_ingresso)
            
            return True, "Compra realizada com sucesso!"
        else:
            return False, "Pagamento recusado."