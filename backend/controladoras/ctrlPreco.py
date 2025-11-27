from catalogos.CatTipoIngresso import CatTipoIngresso

class CtrPreco:
    def atualizar_preco(self, id_tipo_ingresso, novo_valor):

        obj_tipo = CatTipoIngresso.get_tipo_ingresso(id_tipo_ingresso)
        
        if not obj_tipo:
            return False, "Tipo de ingresso não encontrado"
        
        obj_tipo.setValor(novo_valor)
        if id_tipo_ingresso == "inteira":
            obj_meia = CatTipoIngresso.get_tipo_ingresso("meia")
            if obj_meia:
                obj_meia.setValor(float(novo_valor) / 2)
        
        return True, {"nome": obj_tipo.nome, "novo_valor": obj_tipo.valor}